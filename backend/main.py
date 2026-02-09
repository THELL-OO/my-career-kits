from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from resume_router import router as resume_router

app = FastAPI()

app.include_router(resume_router)

app.add_middleware(
  CORSMiddleware,
  allow_origins = ['*'],
  allow_methods = ['*'],
  allow_headers = ['*']
)

@app.get('/')
def read_root():
  return {'message': 'a monk in a cloud!'}
