const arguments = {
    'kanto': () => {
        return {
            first: '151',
            second: '1'
        }
    },

    'johto': () => {
        return {
            first: '251',
            second: '152'
        }
    },

    'hoenn': () => {
        return {
            first: '386',
            second: '252'
        }
    },

    'sinnoh': () => {
        return {
            first: '493',
            second: '387'
        }
    },
    'unova': () => {
        return {
            first: '649',
            second: '494'
        }
    },
    'kalos': () => {
        return {
            first: '721',
            second: '650'
        }
    },
    'alola': () => {
        return {
            first: '809',
            second: '722'
        }
    },
    'galar': () => {
        return {
            first: '905',
            second: '810'
        }
    },
    '*': () => {
        return {
            first: '905',
            second: '1'
        }
    },

};

module.exports = arguments;
