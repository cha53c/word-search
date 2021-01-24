const matching = {
    wordFound: (word, letters) => {
       return JSON.stringify(letters.sort()) === JSON.stringify(word.sort())
    }
};

export default matching;