import os
import logging
import spacy
from sentence_transformers import SentenceTransformer

# Load spaCy transformer model
nlp = spacy.load('en_core_web_trf')

# Suppress unnecessary warnings
logging.getLogger("transformers").setLevel(logging.ERROR)
logging.getLogger("sentence_transformers").setLevel(logging.ERROR)

# Path to store the local SentenceTransformer model
model_path = 'models/mpnet_local'

# Ensure we always use all-mpnet-base-v2
if not os.path.exists(model_path):
    model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
    os.makedirs(model_path, exist_ok=True)
    model.save(model_path)
else:
    model = SentenceTransformer(model_path, device='cpu')


def sentence_embedding(text):
    """
    Converts input text into a list of sentence embeddings (768-dim each)
    """
    # Split text into sentences
    doc = nlp(text)
    sentence_list = [sent.text.strip() for sent in doc.sents]

    # Encode sentences into embeddings
    sentence_vector = model.encode(
        sentence_list,
        output_value='sentence_embedding',
        convert_to_numpy=True,
        convert_to_tensor=False,
        batch_size=24,
        normalize_embeddings=True,
        device='cpu'
    )

    return sentence_vector
