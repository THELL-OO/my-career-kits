from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path
import pickle

BASE_DIR = Path(__file__).resolve().parent  
file_path = BASE_DIR.parent / "final.pkl"

with open(file_path, 'rb') as f:
    data = pickle.load(f)

def similarity(new_resume_vector):
  sim = {'labels': [], 'cosine_sim': []}
  for label, vector in data['domain_value'].items():
      sim['labels'].append(label)
      sim['cosine_sim'].append(cosine_similarity(new_resume_vector.reshape(1,-1), vector.reshape(1,-1)))
  
  max_index = sim['cosine_sim'].index(max(sim['cosine_sim']))
  match_label = sim['labels'][max_index]

  return (max(sim['cosine_sim']))
  