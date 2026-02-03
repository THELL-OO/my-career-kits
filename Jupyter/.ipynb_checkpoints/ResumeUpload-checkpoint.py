from fastapi import APIRouter, File, HTTPException, UploadFile, status
from pathlib import Path
import uuid, re, logging, io, pdfplumber, docx
from Schemas import ResumeResponse
from SentenceEmbedding import sentence_embedding


router = APIRouter(
  prefix='/resume_analyze',
  tags=['Resume']
)


@router.post('', status_code=status.HTTP_202_ACCEPTED ,response_model=ResumeResponse)
async def Resume(resume_file: UploadFile = File(...)):
   try:  
      raw_text = await resume_file.read()

      resume_text = extract_text(raw_text, resume_file)   
      sentence_embedding(resume_text)

      return ResumeResponse(
         filename = resume_file.filename,
         size = resume_file.size,
         message = 'resume_file received successfully'
      )
   
   except Exception as e:
      logging.error(f'Error {e}')
      raise HTTPException(status_code=500, detail='Internal Server')



def clean_text(text):  
 text = re.sub(r'[\u2022\u2023\u25E6\u2043\u2219]', '-', text) #removing common bullets
 text = re.sub(r'[\s+]', ' ', text) #removing any whitespace character
 text = re.sub(r'[^\x00-\x7F]+', ' ', text) #match anything
 return text.strip()


def save_text(text, resume_file):
   upload_dir = Path('upload')
   upload_dir.mkdir(exist_ok=True)

   original_name = Path(resume_file.filename).name
   file_name = f'{uuid.uuid4()}_{original_name}'
   file_path = upload_dir / file_name

   with open(file_path, 'w', encoding='utf-8') as f:
      f.write(text)


def extract_text(raw_text, resume_file):   
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
   
   cleaned_text = clean_text(resume_text)
   # save_text(cleaned_text, resume_file)
   return cleaned_text    

