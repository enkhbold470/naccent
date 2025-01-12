// Create a mapping object for ARPABET phonemes
export const ARPABETMapping = {
  // Vowels
  'aa': 'aa', // odd, father
  'ae': 'ae', // at, fast
  'ah': 'ah', // cut, but
  'ao': 'ao', // caught, law
  'aw': 'aw', // cow, now
  'ay': 'ay', // hide, my
  'eh': 'eh', // red, any
  'er': 'er', // bird, hurt
  'ey': 'ey', // say, eight
  'ih': 'ih', // bid, pin
  'iy': 'iy', // bee, see
  'ow': 'ow', // go, home
  'oy': 'oy', // boy, join
  'uh': 'uh', // good, should
  'uw': 'uw', // blue, food

  // Consonants
  'b': 'b',   // bee
  'ch': 'ch', // cheese
  'd': 'd',   // dee
  'dh': 'dh', // thee
  'f': 'f',   // fee
  'g': 'g',   // green
  'hh': 'hh', // he
  'jh': 'jh', // gee
  'k': 'k',   // key
  'l': 'l',   // lee
  'm': 'm',   // me
  'n': 'n',   // knee
  'ng': 'ng', // ping
  'p': 'p',   // pee
  'r': 'r',   // read
  's': 's',   // sea
  'sh': 'sh', // she
  't': 't',   // tea
  'th': 'th', // thin
  'v': 'v',   // vee
  'w': 'w',   // we
  'y': 'y',   // yield
  'z': 'z',   // zee
  'zh': 'zh'  // measure
};

// Common word to ARPABET mapping
export const commonWordsToARPABET = {
  // Basic words
  'a': 'ah',
  'the': 'dh|ah',
  'is': 'ih|z',
  'are': 'aa|r',
  'to': 't|uw',
  'of': 'ah|v',
  'and': 'ae|n|d',
  'in': 'ih|n',
  
  // Common words
  'hello': 'hh|eh|l|ow',
  'hi': 'hh|ay',
  'bye': 'b|ay',
  'yes': 'y|eh|s',
  'no': 'n|ow',
  'good': 'g|uh|d',
  'bad': 'b|ae|d',
  'what': 'w|ah|t',
  'when': 'w|eh|n',
  'where': 'w|eh|r',
  'who': 'hh|uw',
  'why': 'w|ay',
  'how': 'hh|aw',
  'can': 'k|ae|n',
  'will': 'w|ih|l',
  'would': 'w|uh|d',
  'should': 'sh|uh|d',
  'could': 'k|uh|d',
  'this': 'dh|ih|s',
  'that': 'dh|ae|t',
  'these': 'dh|iy|z',
  'those': 'dh|ow|z',
  'there': 'dh|eh|r',
  'here': 'hh|ih|r',
  'have': 'hh|ae|v',
  'has': 'hh|ae|z',
  'had': 'hh|ae|d',
  'do': 'd|uw',
  'does': 'd|ah|z',
  'did': 'd|ih|d',
  'done': 'd|ah|n',
  'am': 'ae|m',
  'be': 'b|iy',
  'been': 'b|ih|n',
  'was': 'w|ah|z',
  'were': 'w|er',
  'not': 'n|aa|t',
  'with': 'w|ih|th',
  'for': 'f|ao|r',
  'from': 'f|r|ah|m',
  'about': 'ah|b|aw|t',
  'like': 'l|ay|k',
  'know': 'n|ow',
  'think': 'th|ih|ng|k',
  'make': 'm|ey|k',
  'time': 't|ay|m',
  'see': 's|iy',
  'look': 'l|uh|k',
  'come': 'k|ah|m',
  'go': 'g|ow',
  'get': 'g|eh|t',
  'give': 'g|ih|v',
  'use': 'y|uw|z',
  'find': 'f|ay|n|d',
  'tell': 't|eh|l',
  'ask': 'ae|s|k',
  'work': 'w|er|k',
  'seem': 's|iy|m',
  'feel': 'f|iy|l',
  'try': 't|r|ay',
  'back': 'b|ae|k',
  'need': 'n|iy|d',
  'move': 'm|uw|v',
  'play': 'p|l|ey',
  'want': 'w|aa|n|t',
  'live': 'l|ih|v',
  'mean': 'm|iy|n',
  
  // Common phrases
  "that's": "dh|ae|t|s",
  "stuff": "s|t|ah|f",
  
  // Contractions
  "it's": "ih|t|s",
  "thats": "dh|ae|t|s",
  "what's": "w|ah|t|s",
  "there's": "dh|eh|r|z",
  "here's": "hh|ih|r|z",
  
  // Common word combinations
  "going to": "g|ow|ih|ng|t|uh",
  "want to": "w|aa|n|t|uh",
  "got to": "g|aa|t|uh",
  
  // Add more common American English patterns
  "gonna": "g|aa|n|uh",
  "wanna": "w|aa|n|uh",
  "gotta": "g|aa|t|uh"
}; 

// Add American-specific phoneme adjustments
const americanPhonemeAdjustments = {
    't': {
        // When 't' is between vowels or at the end of a word, it often becomes a flap 'd' in American English
        betweenVowels: 'd',
        wordFinal: 't'
    },
    'r': {
        // American English has a stronger 'r' sound
        default: 'r'
    },
    // Add more American-specific adjustments
}; 