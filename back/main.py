from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ResumeUpload import router as resume_router
import os

app = FastAPI()

app.include_router(resume_router)


@app.get('/')
def read_root():
  return {'message': 'hello world!'}