from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path
import pickle
import numpy as np

BASE_DIR = Path(__file__).resolve().parent  
file_path = BASE_DIR.parent / "final.pkl"

with open(file_path, 'rb') as f:
    data = pickle.load(f)

def similarity(new_resume_vector):
    if new_resume_vector is None:
        raise ValueError("new_resume_vector is None")

    new_resume_vector = np.array(new_resume_vector)

    if new_resume_vector.size == 0:
        raise ValueError("new_resume_vector is empty")

    sim = {'labels': [], 'cosine_sim': []}

    for label, vector in data['domain_value'].items():

        vector = np.array(vector)

        score = cosine_similarity(
            new_resume_vector.reshape(1, -1),
            vector.reshape(1, -1)
        )[0][0]  

        sim['labels'].append(label)
        sim['cosine_sim'].append(score)

    max_index = np.argmax(sim['cosine_sim'])
    match_label = sim['labels'][max_index]

    return (float(sim['cosine_sim'][max_index]))
