import re, logging, os, spacy
from sentence_transformers import SentenceTransformer, util
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics.pairwise import cosine_similarity

nlp = spacy.load('en_core_web_trf')

logging.getLogger("transformers").setLevel(logging.ERROR)
logging.getLogger("sentence_transformers").setLevel(logging.ERROR)

model_path = 'models/mpnet_local'

if os.path.exists(model_path):
   model = SentenceTransformer(model_path, device='cpu')

else:
  model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
  model.save(model_path)

def text_to_sentence(text):
  clean = re.sub(r'\b([a-zA-Z]+\.),{2,}\b|([0-9]+\.(?!\d))', lambda m: m.group().replace('.', '[DOT]'), text)
  pattern = r'[\.\?\!]\s+'
  match = re.split(pattern, clean)
  sentence = []
  for s in match:
      s = s.replace('[DOT]', '.')
      sentence.append(s)
  return sentence

def sentence_embedding(text):
  # sentence_list = text_to_sentence(text)
  doc = nlp(text)
  sentence_list = [sent.text.strip() for sent in doc.sents]
  sentence_vector = model.encode(
                      sentence_list, 
                      output_value='sentence_embedding',
                      convert_to_numpy=True,
                      convert_to_tensor=False,
                      batch_size=24,
                      normalize_embeddings=True,
                      device='cpu'
                    )
  # print(sentence_vector)
  # print(len(sentence_vector))
  for i in sentence_list:
     print(i)
  

  similarity = cosine_similarity(sentence_vector)
  print(similarity)
  sns.heatmap(similarity, annot=True, fmt=".2f", cmap="coolwarm")
  plt.show()