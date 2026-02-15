import logging, os, spacy
from sentence_transformers import SentenceTransformer

nlp = spacy.load('en_core_web_trf')

logging.getLogger("transformers").setLevel(logging.ERROR)
logging.getLogger("sentence_transformers").setLevel(logging.ERROR)

model_path = 'models/mpnet_local'

if os.path.exists(model_path):
   model = SentenceTransformer(model_path, device='cpu')

else:
  model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
  model.save(model_path)


def sentence_embedding(text):
  if not text or text.strip() == "":
      return None
  doc = nlp(text)
  sentence_list = [sent.text.strip() for sent in doc.sents]
  if len(sentence_list) == 0:
      return None
  sentence_vector = model.encode(
                      sentence_list, 
                      output_value='sentence_embedding',
                      convert_to_numpy=True,
                      convert_to_tensor=False,
                      batch_size=24,
                      normalize_embeddings=True,
                      device='cpu'
                    )
  if sentence_vector is None or len(sentence_vector) == 0:
      return None
  return sentence_vector