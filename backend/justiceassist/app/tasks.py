
from app.utils.gemini_agent import run_analysis_agent
from datetime import datetime
import json
from app.utils.file_metadata_extractor import extract_rich_metadata

def analyze_report_task(report_id):
    try:
        from app.models import create_app, db
        from app.models.models import Report
    except Exception as e:
        print(f"Import error inside RQ task: {e}")
        return
        
    app = create_app()
    with app.app_context():
        report = None
        try:
            report = Report.query.get(report_id)
            if not report:
                print(f"Report ID {report_id} not found.")
                return

            print(f"Handing off report {report_id} to the AI agent...")
            report.status = 'analyzing'
            db.session.commit()

            # --- NEW WORKFLOW ---
            # 1. Prepare form data as a JSON string
            form_data_json = json.dumps(report.to_dict(), indent=2)

            # 2. Run local metadata extraction on the evidence file (if it exists)
            file_metadata = None
            if report.evidence_file:
                print(f"Running local metadata extraction for: {report.evidence_file}")
                file_metadata = extract_rich_metadata(report.evidence_file)
            
            # 3. Combine form data and metadata for the AI prompt
            report_context = (
                f"## User Submitted Form Data ##\n{form_data_json}\n\n"
                f"## Locally Extracted File Metadata ##\n{json.dumps(file_metadata, indent=2) if file_metadata else 'No file provided or metadata found.'}"
            )

            # 4. Call the AI agent with the context AND the file path
            raw_findings = run_analysis_agent(
                text_to_analyze=report_context,
                report_id=report.id,
                file_path=report.evidence_file  # Pass the file path to the agent
            )
            # --- END OF NEW WORKFLOW ---

            if "error" in raw_findings:
                print(f"AI agent failed for report {report_id}: {raw_findings['error']}")
                report.status = 'failed'
                report.set_json_field("forensic_details", raw_findings)
                db.session.commit()
                return

            indicators_of_compromise = {}
            for tool_run in reversed(raw_findings.get("tool_results", [])):
                if tool_run.get("tool") == "extract_artifacts":
                    indicators_of_compromise = tool_run.get("output", {})
                    break
            
            final_summary_text = raw_findings.get("final_summary_text", "Analysis complete.")
            incident_type = report.complaint_category or "Unknown"
            suspect_profile = "A suspect involved in online malicious activities."

            if "crypto" in incident_type.lower():
                suspect_profile = "Fraudster operating a fake crypto investment scheme."
            elif "phishing" in incident_type.lower() or "email" in incident_type.lower():
                suspect_profile = "Scammer using deceptive emails/websites to steal credentials."

            executive_summary = {
                "summary": final_summary_text.strip(),
                "suspect_profile": suspect_profile,
                "incident_type": incident_type
            }

            analysis_details = {
                "executive_summary": executive_summary,
                "indicators_of_compromise": indicators_of_compromise,
                "tool_investigation_results": raw_findings.get("tool_results", []),
                "analysis_timestamp": datetime.utcnow().isoformat(),
                "report_id": report_id
            }

            dashboard_summary = {
                "summary": executive_summary["summary"],
                "suspect_profile": executive_summary["suspect_profile"]
            }

            report.set_json_field("forensic_summary", dashboard_summary)
            report.set_json_field("forensic_details", analysis_details)
            report.status = "analyzed"
            db.session.commit()
            print(f"AI agent finished for report {report_id}. Detailed results structured and saved successfully.")
        except Exception as e:
            if db.session.is_active:
                db.session.rollback()
            print(f"Exception during AI agent task for report {report_id}: {e}")
            import traceback
            traceback.print_exc()
            if report:
                report.status = 'failed'
                db.session.commit()