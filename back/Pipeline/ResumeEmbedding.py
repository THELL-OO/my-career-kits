import numpy as np

def normalized_mean_of_sentence_vector(sentence_vector):
    mean_vector = np.mean(np.array(sentence_vector), axis=0)
    #print(mean_vector.shape)
    norm = np.linalg.norm(mean_vector)
    if norm == 0 or np.isnan(norm):
        return None
    normalized_vector = mean_vector / norm
    #print(np.linalg.norm(normalized_vector))
    return normalized_vector