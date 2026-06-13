from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from utils import analyze_resume_bytes

app = FastAPI(
    title=" Resume Screening System",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def home():
    return {"message": " Resume Screening System is running "}

@app.post("/screen")
async def screen_resume(
    job_description: str = Form(...),
    resume: UploadFile = File(...)
):
    file_bytes = await resume.read()
    result = analyze_resume_bytes(file_bytes, job_description)
    return result


