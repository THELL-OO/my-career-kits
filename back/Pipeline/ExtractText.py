import re, io, pdfplumber, docx

def clean_text(text):  
 text = re.sub(r'[\u2022\u2023\u25E6\u2043\u2219]', '-', text) #removing common bullets
 text = re.sub(r'[\s+]', ' ', text) #removing any whitespace character
 text = re.sub(r'[^\x00-\x7F]+', ' ', text) #match anything
 return text.strip()


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
   return cleaned_text    

