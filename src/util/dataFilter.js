const fetch = require('node-fetch');

function filteringMoves(moves) {
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

function filteringTypes(types) {
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

function filteringSprites(sprites) {
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

                    if (spriteName === 'front_female') {
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

                    if (spriteName === 'front_female') {
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

                        if (spriteName === 'front_female') {
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

async function filteringForms(forms) {
    try {
        const filteredForms = [];
        for (let { url } of forms) {
            const request = await fetch(url);
            if (!request.ok) throw {
                message: 'Request failed for forms url.',
                status: 500
            };

            const {
                form_name, sprites: {
                    front_default, front_shiny
                }
            } = await request.json();

            const newFormsItem = {
                name: form_name,
                default: front_default,
                shiny: front_shiny
            };

            filteredForms.push(newFormsItem);
        };

        return {
            filteredForms: filteredForms.length > 1 ? filteredForms : []
        };
    } catch (error) {
        return { error };
    };
};

async function filteringEvolutionChain(evolutionChain) {
    try {
        const { url } = evolutionChain;
        const request = await fetch(url);

        if (!request.ok) throw {
            message: 'Evolution request failed',
            status: 500
        };
        let { chain } = await request.json();
        const filteredChain = [];
        let details;

        if (chain?.evolves_to?.length) {
            do {
                if (chain?.evolution_details?.length) {
                    details = Object.entries(chain?.evolution_details[0])
                        .filter(([, value]) => value)
                        .reduce((prev, [key, value]) => ({
                            ...prev,
                            [key]: value
                        }), {});
                };

                filteredChain.push({
                    species: chain?.species?.name ? chain?.species?.name : '',
                    details
                });

                let numberOfEvolutions = chain['evolves_to']?.length;
                if (numberOfEvolutions > 1) {
                    for (let i = 1; i < numberOfEvolutions; i++) {
                        details = Object.entries(chain?.evolves_to[i]?.evolution_details[0])
                            .filter(([, value]) => value)
                            .reduce((prev, [key, value]) => ({
                                ...prev,
                                [key]: value
                            }), {});


                        filteredChain.push({
                            species: chain?.evolves_to[i]?.species.name,
                            details
                        });
                    };
                };

                chain = chain['evolves_to'][0];
            } while (chain && chain?.hasOwnProperty('evolves_to'));
        };

        return {
            filteredChain: (filteredChain?.length && filteredChain?.length > 1) ?
                filteredChain : []
        };
    } catch (error) {
        return { error };
    };
};

function filteringDescriptions(descriptions) {
    try {
        const formattingDescriptions = descriptions?.map((item) => {
            return item = {
                text: item?.flavor_text?.replace(/(\n|\f)/gm, " "),
                language: item?.language?.name,
                version: item?.version.name
            }
        });

        const englishDescriptions = formattingDescriptions?.filter(({ language }) => language === 'en');

        return {
            filteredDescriptions: englishDescriptions?.length ?
                englishDescriptions : []
        };
    } catch (error) {
        return { error };
    };
};

function filteringSpecies(species) {
    try {
        let filteredSpecie = species.find(({ language: { name } }) => name === 'en');
        filteredSpecie = {
            specie: filteredSpecie.genus,
        };

        return {
            filteredSpecie
        };
    } catch (error) {
        return { error };
    };
};

function filteringPokedexNumbers(pokedexNumbers) {
    try {
        let filteredPokedexNumbers = pokedexNumbers?.map((pokedex) => {
            return pokedex = {
                entryNumber: pokedex?.entry_number,
                pokedexName: pokedex?.pokedex.name
            };
        });
        return {
            filteredPokedexNumbers: filteredPokedexNumbers?.length ? filteredPokedexNumbers : []
        };
    } catch (error) {
        return { error };
    };
};

function filteringVarieties(varieties) {
    try {
        let filteredVarieties = [];
        if (varieties?.length) {
            filteredVarieties = varieties?.map(({ pokemon }) => {
                return {
                    ...pokemon
                };
            });

        };

        return {
            filteredVarieties: filteredVarieties?.length ? filteredVarieties : []
        };
    } catch (error) {
        return { error };
    };
};

async function filteringSpeciesUrl(species) {
    try {
        const { url } = species;
        const request = await fetch(url);
        if (!request.ok) throw {
            message: 'Species request failed',
            status: 500
        };
        const response = await request.json();

        let evolutionsChain = [];
        if (response?.evolution_chain && response?.evolution_chain?.length) {
            const {
                filteredChain, error: chainError
            } = await filteringEvolutionChain(response?.evolution_chain);
            if (chainError) throw { chainError };
            evolutionsChain = [...filteredChain];
        };

        let pokemonDescriptions = [];
        if (response?.flavor_text_entries && response.flavor_text_entries?.length) {
            const {
                filteredDescriptions, error: descriptionsError
            } = filteringDescriptions(response?.flavor_text_entries);
            if (descriptionsError) throw { descriptionsError };
            pokemonDescriptions = [...filteredDescriptions];
        };

        let pokemonSpecie = {
            specie: 'unkown'
        };
        if (response?.genera && response?.genera?.length) {
            const {
                filteredSpecie, error: speciesError
            } = filteringSpecies(response?.genera);
            if (speciesError) throw { speciesError };
            pokemonSpecie = {
                ...filteredSpecie
            };
        };

        let pokedexNumbers = [];
        if (response?.pokedex_numbers && response?.pokedex_numbers?.length) {
            const {
                filteredPokedexNumbers, error: pokedexNumbersError
            } = filteringPokedexNumbers(response?.pokedex_numbers);
            if (pokedexNumbersError) throw { pokedexNumbersError };

            pokedexNumbers = [...filteredPokedexNumbers];
        };

        let pokemonVarieties = [];
        if (response?.varieties && response?.varieties?.length) {
            const {
                filteredVarieties, error: varietiesError
            } = filteringVarieties(response?.varieties);
            if (varietiesError) throw { varietiesError };

            pokemonVarieties = [...filteredVarieties];
        };

        const filteredSpeciesUrl = {
            evolutionsChain,
            pokemonDescriptions,
            pokemonSpecie,
            pokedexNumbers,
            pokemonVarieties,
            legendary: response?.is_legendary ?
                response.is_legendary : false,
            mythical: response?.is_mythical ?
                response.is_mythical : false,
            habitat: response.habitat ?
                response?.habitat?.name : 'No habitat'
        };
        return { filteredSpeciesUrl };
    } catch (error) {
        console.log({ error })
        return { error };
    };
};

async function filteringPokemonData(pokemonData) {
    try {
        const {
            filteredMoves, error: errorMoves
        } = filteringMoves(pokemonData.moves);

        if (errorMoves) throw errorMoves;

        const {
            filteredTypes, error: errorTypes
        } = filteringTypes(pokemonData.types);

        if (errorTypes) throw errorTypes;

        const {
            filteredSprites, error: errorSprites
        } = filteringSprites(pokemonData.sprites);

        if (errorSprites) throw errorSprites;

        const {
            filteredForms, error: errorForms
        } = await filteringForms(pokemonData.forms);

        if (errorForms) throw errorForms;

        const {
            filteredSpeciesUrl: {
                evolutionsChain,
                pokemonDescriptions,
                pokemonSpecie,
                pokedexNumbers,
                pokemonVarieties,
                legendary,
                mythical,
                habitat
            }, error: errorSpeciesUrl
        } = await filteringSpeciesUrl(pokemonData.species);

        if (errorSpeciesUrl) throw errorSpeciesUrl;


        let newPokemonData = {
            name: pokemonData.name.toLowerCase(),
            nationaldex: pokemonData.id,
            all_dex_numbers: pokedexNumbers?.length ?
                pokedexNumbers : [],
            types: filteredTypes,
            descriptions: pokemonDescriptions,
            habitat,
            species: pokemonSpecie,
            weight: pokemonData.weight,
            height: pokemonData.height,
            location_area_encounters: pokemonData.location_area_encounters,
            abilities: pokemonData.abilities,
            moves: filteredMoves,
            evolutions: evolutionsChain,
            forms: filteredForms,
            varieties: pokemonVarieties,
            sprites: filteredSprites,
            legendary,
            mythical,
            stats: pokemonData.stats
        };

        return { newPokemonData };
    } catch (error) {
        console.log(error);
        return { error };
    };
};

module.exports = filteringPokemonData;