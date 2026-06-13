from pathlib import Path
import re
import pdfplumber
import docx

COMMON_SKILLS = [
    "python", "java", "c++", "sql", "aws", "docker", "git",
    "machine learning", "nlp", "deep learning", "pytorch",
]

def extract_pdf_text(pdf_file):
    text = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_skills(text: str):
    text_lower = text.lower()
    return [skill for skill in COMMON_SKILLS if skill in text_lower]

def experience_years(text: str):
    matches = re.findall(r"(\d+)\s+years", text.lower())
    return int(max(matches)) if matches else 0

def score_resume(resume_text: str, job_description: str):
    resume_words = set(re.findall(r"\w+", resume_text.lower()))
    job_words = set(re.findall(r"\w+", job_description.lower()))
    overlap = len(resume_words & job_words)
    return round((overlap / max(len(job_words), 1)) * 100, 2)

def process_resume(job_description, resume_file):
    # Read resume PDF content
    pdf_path = f"uploads/{resume_file.filename}"
    with open(pdf_path, "wb") as f:
        f.write(resume_file.file.read())

    resume_text = extract_pdf_text(pdf_path)

    # In case PDF has no text
    if not resume_text.strip():
        resume_text = "[No readable text found]"

    return {
        "skills_found": [],
        "experience_years": 0,
        "score": 0.0,
        "preview": resume_text[:300]  # Return first 300 chars
    }

    
