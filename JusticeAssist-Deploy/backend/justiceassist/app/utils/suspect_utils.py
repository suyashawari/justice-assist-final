
import re
import os
import socket
import hashlib
import json
import tldextract
import whois
import dns.resolver
from ipwhois import IPWhois
import google.generativeai as genai
from openai import OpenAI
from tavily import TavilyClient

gemini_model = None
if os.getenv("GOOGLE_API_KEY") and os.getenv("GOOGLE_API_KEY") != "YOUR_API_KEY_HERE":
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    gemini_model = genai.GenerativeModel("gemini-2.0-flash-lite")

openai_client = None
if os.getenv("OPENAI_API_KEY") and os.getenv("OPENAI_API_KEY") != "YOUR_API_KEY_HERE":
    openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def inspect_urls(urls: list) -> list:
    print(f"\n[TOOL CALLED] Running `inspect_urls` for {len(urls)} URLs...")
    if not urls or not isinstance(urls, list):
        print("[TOOL SKIPPED] No URLs provided or invalid input.")
        return []
    results = []
    if not isinstance(urls, list): return [{"error": "Input must be a list of URLs."}]
    for url in urls:
        entry = {"url": url}
        try:
            ext = tldextract.extract(url)
            domain = f"{ext.domain}.{ext.suffix}"
            entry["domain"] = domain
            try:
                answers = dns.resolver.resolve(domain, "A")
                entry["dns_resolved_ips"] = [r.to_text() for r in answers]
            except Exception as e:
                entry["dns_error"] = str(e)
            try:
                w = whois.whois(domain)
                entry["whois_registrar"] = w.registrar
                entry["whois_creation_date"] = str(w.creation_date)
            except Exception as e:
                entry["whois_error"] = str(e)
        except Exception as e:
            entry["error"] = str(e)
        results.append(entry)
    print(f"[TOOL RESULT] URL inspection complete. {len(results)} records created.")
    return results

def inspect_ips(ips: list) -> list:
    print(f"\n[TOOL CALLED] Running `inspect_ips` for {len(ips)} IPs...")
    if not ips or not isinstance(ips, list):
        print("[TOOL SKIPPED] No IPs provided or invalid input.")
        return []
    results = []
    if not isinstance(ips, list): return [{"error": "Input must be a list of IPs."}]
    for ip in ips:
        entry = {"ip": ip}
        try:
            obj = IPWhois(ip)
            rd = obj.lookup_rdap()
            entry["asn_description"] = rd.get("asn_description")
            entry["country"] = rd.get("country")
        except Exception as e:
            entry["error"] = str(e)
        results.append(entry)
    print(f"[TOOL RESULT] IP inspection complete. {len(results)} records created.")
    return results

def web_search(query: str) -> dict:
    print(f"\n[TOOL CALLED] Running `web_search` for query: {query}...")
    if not query:
        print("[TOOL SKIPPED] Empty query provided.")
        return {"results": []}
    try:
        api_key = os.getenv("TAVILY_API_KEY")
        if not api_key:
            return {"error": "Tavily API key is not configured."}
        tavily = TavilyClient(api_key=api_key)
        response = tavily.search(query=query, search_depth="basic", max_results=3)
        return {"results": response['results']}
    except Exception as e:
        print(f"[TOOL ERROR] Tavily search failed: {e}")
        return {"error": str(e)}

TOOL_REGISTRY = {
    "inspect_urls": inspect_urls,
    "inspect_ips": inspect_ips,
    "web_search": web_search,
}

def chat_with_ai(messages):
    pass

def analyze_evidence(text: str = "", file_path: str = None):
    from app.utils.gemini_agent import run_analysis_agent
    print("\n--- [START] AI-DRIVEN Forensic Analysis (Wrapper) ---")
    context = f"## EVIDENCE DESCRIPTION\n{text}\n## EVIDENCE FILE PATH\n{file_path or 'No file provided'}"
    raw_findings = run_analysis_agent(text_to_analyze=context, report_id=0, file_path=file_path)
    
    # Since extract_artifacts is removed, we can't get initial_artifacts this way.
    # The AI will now be responsible for finding these in its final summary.
    initial_artifacts = {}

    return {
        "summary": raw_findings.get("final_summary_text", "Analysis complete."),
        "suspect_profile": "AI Generated (See Summary)",
        "clues": [],
        "artifacts": initial_artifacts,
        "tool_results": raw_findings.get("tool_results", [])
    }