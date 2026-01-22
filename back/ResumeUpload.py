from fastapi import APIRouter, File, UploadFile
from Schemas import ResumeResponse

router = APIRouter(
  prefix='/resume_analyze',
  tags=['Resume']
)

@router.post('', response_model=ResumeResponse)
async def resumefile(resume_file: UploadFile = File(...)):
   data = await resume_file.read()
   print(data)
   print(resume_file.size)
   return ResumeResponse(
      filename = resume_file.filename,
      size = resume_file.size,
      message = 'resume_file received successfully'
   )