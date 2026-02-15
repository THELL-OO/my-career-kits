import numpy as np

def normalized_mean_of_sentence_vector(sentence_vector):

    if sentence_vector is None or len(sentence_vector) == 0:
        return None

    sentence_vector = np.array(sentence_vector)

    if sentence_vector.size == 0:
        return None

    mean_vector = np.mean(sentence_vector, axis=0)

    if np.isnan(mean_vector).any():
        return None

    norm = np.linalg.norm(mean_vector)

    if norm == 0 or np.isnan(norm):
        return None

    normalized_vector = mean_vector / norm

    return normalized_vector
