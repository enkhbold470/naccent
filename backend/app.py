


#print("hello world")

import requests
from phonemizer import phonemize
from phonemizer.separator import Separator

#text is a list of 190 English sentences downloaded from github
# url = (
#     'https://gist.githubusercontent.com/CorentinJ/'
#     '0bc27814d93510ae8b6fe4516dc6981d/raw/'
#     'bb6e852b05f5bc918a9a3cb439afe7e2de570312/small_corpus.txt')

# text = requests.get(url).content.decode()
text = "good boy"

#phn is a list of 190 phonemized sentences
phn = phonemize(
    text,
    language='en-us',
    backend='festival',
    separator=Separator(phone=None, word=' ', syllable='|'),
    strip=True,
    preserve_punctuation=True,
    njobs=4)

print(phn)
print(phn)
print(phn)

