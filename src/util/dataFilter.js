async function filteringMoves(moves) {
    try {
        let filteredMoves = [];
        for (let { move } of moves) {
            filteredMoves.push(move);
        };

        return { filteredMoves };
    } catch (error) {
        return { error };
    };
};

async function filteringTypes(types) {
    try {
        let filteredTypes = [];
        for (let { type } of types) {
            filteredTypes.push(type);
        };

        return { filteredTypes };
    } catch (error) {
        return { error };
    };
};

async function filteringSprites(sprites) {
    try {
        const { other, versions } = sprites;

        let maleSprites = {
            front: [],
            back: [],
            shiny_front: [],
            shiny_back: []
        };

        let femaleSprites = {
            front: [],
            back: [],
            shiny_front: [],
            shiny_back: []
        };

        let filteredSprites = [];

        //Dealing with defaultSprites;
        for (let spriteName in sprites) {
            if (!spriteName.includes('other') &&
                !spriteName.includes('versions')) {
                if (sprites[spriteName]) {
                    if (spriteName === 'front_default') {
                        maleSprites.front.push(sprites[spriteName]);
                    };

                    if (spriteName === 'back_default') {
                        maleSprites.back.push(sprites[spriteName]);
                    };

                    if (spriteName === 'front_shiny') {
                        maleSprites.shiny_front.push(sprites[spriteName]);
                    };

                    if (spriteName === 'back_shiny') {
                        maleSprites.shiny_back.push(sprites[spriteName]);
                    };

                    if (spriteName === 'front_default_female') {
                        femaleSprites.front.push(sprites[spriteName]);
                    };

                    if (spriteName === 'back_female') {
                        femaleSprites.back.push(sprites[spriteName]);
                    };

                    if (spriteName === 'front_shiny_female') {
                        femaleSprites.shiny_front.push(sprites[spriteName]);
                    };

                    if (spriteName === 'back_shiny_female') {
                        femaleSprites.shiny_back.push(sprites[spriteName]);
                    };
                };
            };
        };

        //Dealing with otherSprites;
        for (let otherType in other) {
            for (let spriteName in other[otherType]) {
                if (other[otherType][spriteName]) {
                    if (spriteName === 'front_default') {
                        maleSprites.front.push(other[otherType][spriteName]);
                    };

                    if (spriteName === 'back_default') {
                        maleSprites.back.push(other[otherType][spriteName]);
                    };

                    if (spriteName === 'front_shiny') {
                        maleSprites.shiny_front.push(other[otherType][spriteName]);
                    };

                    if (spriteName === 'back_shiny') {
                        maleSprites.shiny_back.push(other[otherType][spriteName]);
                    };

                    if (spriteName === 'front_default_female') {
                        femaleSprites.front.push(other[otherType][spriteName]);
                    };

                    if (spriteName === 'back_female') {
                        femaleSprites.back.push(other[otherType][spriteName]);
                    };

                    if (spriteName === 'front_shiny_female') {
                        femaleSprites.shiny_front.push(other[otherType][spriteName]);
                    };

                    if (spriteName === 'back_shiny_female') {
                        femaleSprites.shiny_back.push(other[otherType][spriteName]);
                    };
                };
            };
        };

        //Dealing with versionSprites
        for (let generation in versions) {
            for (let gameVersion in versions[generation]) {
                for (let spriteName in versions[generation][gameVersion]) {
                    if (versions[generation][gameVersion][spriteName]) {
                        if (spriteName === 'front_default') {
                            maleSprites.front.push(versions[generation][gameVersion][spriteName]);
                        };

                        if (spriteName === 'back_default') {
                            maleSprites.back.push(versions[generation][gameVersion][spriteName]);
                        };

                        if (spriteName === 'front_shiny') {
                            maleSprites.shiny_front.push(versions[generation][gameVersion][spriteName]);
                        };

                        if (spriteName === 'back_shiny') {
                            maleSprites.shiny_back.push(versions[generation][gameVersion][spriteName]);
                        };

                        if (spriteName === 'front_default_female') {
                            femaleSprites.front.push(versions[generation][gameVersion][spriteName]);
                        };

                        if (spriteName === 'back_female') {
                            femaleSprites.back.push(versions[generation][gameVersion][spriteName]);
                        };

                        if (spriteName === 'front_shiny_female') {
                            femaleSprites.shiny_front.push(versions[generation][gameVersion][spriteName]);
                        };

                        if (spriteName === 'back_shiny_female') {
                            femaleSprites.shiny_back.push(versions[generation][gameVersion][spriteName]);
                        };
                    };
                };
            };
        };

        filteredSprites.push(maleSprites);
        filteredSprites.push(femaleSprites);

        return { filteredSprites };

    } catch (error) {
        return { error };
    };
};

async function filteringPokemonData(pokemonData) {
    try {
        const {
            filteredMoves, error: errorMoves
        } = await filteringMoves(pokemonData.moves);

        const {
            filteredTypes, error: errorTypes
        } = await filteringTypes(pokemonData.types);

        const {
            filteredSprites, error: errorSprites
        } = await filteringSprites(pokemonData.sprites);

        if (errorMoves || errorTypes || errorSprites) throw 'Error filtering Pokemon Data';

        const initialUpperCaseName =
            `${pokemonData.name[0].toUpperCase()}${pokemonData.name.slice(1)}`;

        let newPokemonData = {
            dexnr: pokemonData.id,
            name: initialUpperCaseName,
            weight: pokemonData.weight,
            height: pokemonData.height,
            location_area_encounters: pokemonData.location_area_encounters,
            abilities: pokemonData.abilities,
            forms: pokemonData.forms,
            moves: filteredMoves,
            types: filteredTypes,
            sprites: filteredSprites,
            species: pokemonData.species,
            stats: pokemonData.stats
        };
        return { newPokemonData };
    } catch (error) {
        return { error };
    };
};

module.exports = filteringPokemonData;