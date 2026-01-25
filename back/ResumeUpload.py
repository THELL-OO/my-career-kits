from fastapi import APIRouter, File, HTTPException, UploadFile, status
from pathlib import Path
import uuid, re, logging, io, pdfplumber, docx
from Schemas import ResumeResponse


router = APIRouter(
  prefix='/resume_analyze',
  tags=['Resume']
)



def clean_text(text):  
    text = re.sub(r'[\s+]', ' ', text) #removing any whitespace character
    text = re.sub(r'[^\x00-\x7F]+', ' ', text) #match anything
    return text.strip()


@router.post('', status_code=status.HTTP_202_ACCEPTED ,response_model=ResumeResponse)
async def resumefile(resume_file: UploadFile = File(...)):
   try:  
      raw_text = await resume_file.read()
      if resume_file.content_type == 'application/pdf':
         with pdfplumber.open(io.BytesIO(raw_text)) as pdf:
            resume_text = []
            for page in pdf.pages:
               resume_text.append(page.extract_text() or "")
            resume_text = ' '.join(resume_text)
            
      
      elif resume_file.content_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
         document = docx.Document(io.BytesIO(raw_text))
         resume_text = ' '.join([para.text for para in document.paragraphs])


      else:
         resume_text = raw_text.decode('utf-8', errors='ignore')
         
   
      # upload_dir = Path('upload')
      # upload_dir.mkdir(exist_ok=True)

      # original_name = Path(resume_file.filename).name
      # file_name = f'{uuid.uuid4()}_{original_name}'
      # file_path = upload_dir / file_name

      # # with open(file_path, 'wb') as f:
      # #    f.write(resume_text)


      cleaned_text = clean_text(resume_text)
      print(cleaned_text)


      # for ents in doc.

      return ResumeResponse(
         filename = resume_file.filename,
         size = resume_file.size,
         message = 'resume_file received successfully'
      )
   
   except Exception as e:
      logging.error(f'Error {e}')
      raise HTTPException(status_code=500, detail='Internal Server')
