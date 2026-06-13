import io
import re
import pdfplumber
from PIL import Image
import pytesseract


# TEXT EXTRACTION


def extract_text_from_pdf(pdf_bytes):
    text = ""
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + " "
    return text


def extract_text_from_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    return pytesseract.image_to_string(image)



# NLP HELPERS


STOPWORDS = {
    "the","and","is","in","to","of","for","with","on","at","by",
    "an","a","as","be","this","that","from","or","are"
}

def extract_keywords(text):
    words = re.findall(r"[a-zA-Z]+", text.lower())
    keywords = [w for w in words if w not in STOPWORDS and len(w) > 3]
    return list(set(keywords))


def extract_experience(text):
    matches = re.findall(r"(\d+)\s+year", text.lower())
    if matches:
        return max(int(x) for x in matches)
    return 0



# MAIN ANALYSIS FUNCTION


def analyze_resume_bytes(file_bytes, job_description):

    # Detect file type
    is_pdf = file_bytes[:4] == b"%PDF"

    if is_pdf:
        resume_text = extract_text_from_pdf(file_bytes)
    else:
        resume_text = extract_text_from_image(file_bytes)

    if not resume_text.strip():
        return {
            "error": "Could not extract text from resume"
        }

    # Extract keywords dynamically
    jd_keywords = extract_keywords(job_description)
    resume_keywords = extract_keywords(resume_text)

    matched_skills = list(set(jd_keywords) & set(resume_keywords))

    experience_years = extract_experience(resume_text)

    # Scoring logic (generic)
    score = min(100, len(matched_skills) * 5 + experience_years * 10)

    return {
        "matched_keywords": matched_skills[:20],
        "experience_years": experience_years,
        "score": score,
        "resume_preview": resume_text[:500]
    }



