from pydantic import BaseModel

class ResumeResponse(BaseModel):
  filename: str
  size: int
  message: str