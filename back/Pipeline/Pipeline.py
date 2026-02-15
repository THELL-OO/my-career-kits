from Pipeline.Similarity import similarity
from Pipeline.ExtractText import extract_text
from Pipeline.ResumeEmbedding import normalized_mean_of_sentence_vector
from Pipeline.SentenceEmbedding import sentence_embedding


def resume_pipeline(raw_text, resume_file):
  cleaned_text = extract_text(raw_text, resume_file) # extract and cleaned the text

  sentence_vectors = sentence_embedding(cleaned_text) # embedding the sentences

  new_resume_vector = normalized_mean_of_sentence_vector(sentence_vectors) # mean of resume

  similarity_score = similarity(new_resume_vector) # similarity score of resume

  return similarity_score, cleaned_text
