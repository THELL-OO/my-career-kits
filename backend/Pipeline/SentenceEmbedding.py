import logging, os, spacy
from sentence_transformers import SentenceTransformer

logging.getLogger("transformers").setLevel(logging.ERROR)

nlp = spacy.blank("en")
nlp.add_pipe("sentencizer")

model_path = "models/mpnet_local"

if os.path.exists(model_path):
    model = SentenceTransformer(model_path, device="cpu")
else:
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2", device="cpu")
    model.save(model_path)


def sentence_embedding(text):
    doc = nlp(text)
    sentence_list = [sent.text.strip() for sent in doc.sents]

    return model.encode(
        sentence_list,
        convert_to_numpy=True,
        batch_size=16,
        normalize_embeddings=True
    )
