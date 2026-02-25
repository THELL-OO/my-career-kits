from fastapi import APIRouter, File, HTTPException, UploadFile, status
from pathlib import Path
from Schemas import ResumeResponse
from Pipeline.Pipeline import resume_pipeline
import uuid, logging

router = APIRouter(
  prefix='/analyze-resume',
  tags=['Resume Analyze']
)

@router.post('', status_code=status.HTTP_202_ACCEPTED, response_model=ResumeResponse)
async def resume(resume_file: UploadFile = File(...)):
   try:  
      raw_text = await resume_file.read()
      score= resume_pipeline(raw_text, resume_file)
      score = int(score*100)

      return ResumeResponse(
         filename = resume_file.filename,
         size = resume_file.size,
         score = score,
         message = 'resume_file received successfully!'
      )
   
   except Exception as e:
      logging.error(f'Error {e}')
      raise HTTPException(status_code=500, detail='Internal Server')
