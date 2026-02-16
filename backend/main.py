from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from resume_router import router as resume_router

app = FastAPI()

origins = [
    "https://mycareerkits.com",
    "https://www.mycareerkits.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)

@app.get('/')
def read_root():
  return {'message': 'a monk in a cloud!'}
