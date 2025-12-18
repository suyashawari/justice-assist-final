
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import requests
from dotenv import load_dotenv
from app.models import db
from app.models.models import Report
from werkzeug.utils import secure_filename
from app.utils.suspect_utils import analyze_evidence

load_dotenv()

# --- NEW: Direct Gemini Configuration for Guidance ---
# Using the modern and fast Gemini 1.5 Flash model for conversational guidance.
GEMINI_API_URL =  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
GEMINI_API_KEYS = [key.strip() for key in os.getenv("GEMINI_API_KEYS", "").split(",") if key.strip()]
# --- End of New Configuration ---

ai = Blueprint('ai', __name__)
UPLOAD_FOLDER = "uploads"

@ai.route('/get-guidance', methods=['POST'])
@jwt_required()
def get_guidance():
    data = request.get_json()
    user_query = data.get("query", "")
    if not user_query:
        return jsonify({"status": "error", "error": "Query is required"}), 400

    prompt = (
        "You are an expert Indian cybercrime legal assistant. "
        "Based on the following user query, provide clear, concise, and actionable guidance. "
        "Explain the type of cybercrime, immediate steps the user should take, "
        "what evidence to collect, and which sections of Indian law might apply. "
        "Keep the tone helpful and reassuring.\n\n"
        "make it in 3 to 4 lines short and simple words and no table or bullet points just plain text\n\n"
        f"User Query: \"{user_query}\""
    )

    if not GEMINI_API_KEYS:
        print("ERROR: GEMINI_API_KEYS not found in .env file.")
        return jsonify({
            "status": "error",
            "error": "AI service is not configured correctly on the server."
        }), 500

    try:
        # Use the first available Gemini key
        api_key = GEMINI_API_KEYS[0]
        full_url = f"{GEMINI_API_URL}?key={api_key}"

        headers = {
            "Content-Type": "application/json"
        }
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }
        
        response = requests.post(full_url, headers=headers, json=payload, timeout=90)
        response.raise_for_status()  # This will raise an exception for HTTP error codes
        
        response_data = response.json()
        guidance_text = response_data['candidates'][0]['content']['parts'][0]['text']

        return jsonify({
            "status": "success",
            "provider": "Google Gemini", # Updated provider name
            "guidance": guidance_text
        }), 200

    except requests.exceptions.RequestException as e:
        print(f"Gemini API request failed: {e}")
        if hasattr(e, 'response') and e.response is not None:
             if e.response.status_code in [401, 403, 429]:
                return jsonify({"status": "error", "error": "AI service authentication failed. Check server API key."}), 500
        return jsonify({
            "status": "error",
            "error": "The AI guidance service failed to connect. Please try again later."
        }), 500
    except Exception as e:
        print(f"An error occurred while processing the Gemini response: {e}")
        return jsonify({
            "status": "error",
            "error": "An unexpected error occurred with the AI guidance service."
        }), 500

@ai.route('/guess-suspect', methods=['POST'])
@jwt_required()
def guess_suspect():
    user_id = get_jwt_identity()
    data = request.form.to_dict() or {}
    report_id = data.get("report_id")
    evidence_text = data.get("evidence_text", "")
    evidence_file = request.files.get("evidence_file")

    file_path = None
    if report_id:
        report = Report.query.filter_by(id=report_id, user_id=user_id).first()
        if not report:
            return jsonify({"status": "error", "error": "Report not found"}), 404
        evidence_text = report.description
        file_path = report.evidence_file
    elif evidence_file:
        os.makedirs("uploads", exist_ok=True)
        filename = secure_filename(evidence_file.filename)
        file_path = os.path.join("uploads", filename)
        evidence_file.save(file_path)

    if not evidence_text and not file_path:
        return jsonify({
            "status": "error",
            "error": "Either text or file evidence is required"
        }), 400

    result = analyze_evidence(text=evidence_text, file_path=file_path)

    dashboard_view = {
        "suspect_profile": result.get("suspect_profile") or "Unknown",
        "summary": result.get("summary", ""),
        "artifacts": {
            "emails": result.get("artifacts", {}).get("emails", []),
            "urls": result.get("artifacts", {}).get("urls", []),
            "ip_addresses": result.get("artifacts", {}).get("ips", []),
        }
    }

    detailed_view = {
        "summary": result.get("summary", ""),
        "suspect_profile": result.get("suspect_profile") or "Unknown",
        "clues": result.get("clues", []),
        "artifacts": result.get("artifacts", {}),
        "tool_results": {
            "whois": result.get("whois", {}),
            "dns": result.get("dns", {}),
            "ip_info": result.get("ip_info", {}),
            "url_analysis": result.get("url_analysis", {}),
            "file_metadata": result.get("file_metadata", {})
        }
    }

    return jsonify({
        "status": "success",
        "dashboard": dashboard_view,
        "detailed": detailed_view
    }), 200