from fastapi import APIRouter, File, HTTPException, UploadFile, status
from pathlib import Path
from Schemas import ResumeResponse
from Pipeline.Pipeline import resume_pipeline
import uuid, logging

router = APIRouter(
  prefix='/resume_analyze',
  tags=['Resume']
)


@router.post('', status_code=status.HTTP_202_ACCEPTED ,response_model=ResumeResponse)
async def resume(resume_file: UploadFile = File(...)):
   try:  
      raw_text = await resume_file.read()

      score= resume_pipeline(raw_text, resume_file)  

      return ResumeResponse(
         filename = resume_file.filename,
         size = resume_file.size,
         score = score,
         message = 'resume_file received successfully!'
      )
   
   except Exception as e:
      logging.error(f'Error {e}')
      raise HTTPException(status_code=500, detail='Internal Server')



def save_text(text, resume_file):
   upload_dir = Path('upload')
   upload_dir.mkdir(exist_ok=True)

   original_name = Path(resume_file.filename).name
   file_name = f'{uuid.uuid4()}_{original_name}'
   file_path = upload_dir / file_name

   with open(file_path, 'w', encoding='utf-8') as f:
      f.write(text)


