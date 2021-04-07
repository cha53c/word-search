const matching = {
    wordFound: (word, letters) =>
        JSON.stringify([...letters].sort()) === JSON.stringify([...word].sort()),

};

export default matching;