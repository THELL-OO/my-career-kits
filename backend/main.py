from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD:back/main.py
from ResumeUpload import router as resume_router
import os
=======
from resume_router import router as resume_router
>>>>>>> f8ac57d8993d53e3310c121e777e714eafbd1695:backend/main.py

app = FastAPI()

app.include_router(resume_router)

<<<<<<< HEAD:back/main.py
=======
app.add_middleware(
  CORSMiddleware,
  allow_origins = ['*'],
  allow_methods = ['*'],
  allow_headers = ['*']
)
>>>>>>> f8ac57d8993d53e3310c121e777e714eafbd1695:backend/main.py

@app.get('/')
def read_root():
  return {'message': 'a monk in a cloud!'}
