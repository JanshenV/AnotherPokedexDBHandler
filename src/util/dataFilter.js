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
            if (!request.ok) throw new 'Request failed for forms url.';

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
                if (chain.evolution_details.length) {
                    details = Object.entries(chain.evolution_details[0])
                        .filter(([, value]) => value)
                        .reduce((prev, [key, value]) => ({
                            ...prev,
                            [key]: value
                        }), {});
                };

                filteredChain.push({
                    species: chain.species.name ? chain.species.name : '',
                    details
                });

                let numberOfEvolutions = chain['evolves_to'].length;
                if (numberOfEvolutions > 1) {
                    for (let i = 1; i < numberOfEvolutions; i++) {
                        details = Object.entries(chain.evolves_to[i].evolution_details[0])
                            .filter(([, value]) => value)
                            .reduce((prev, [key, value]) => ({
                                ...prev,
                                [key]: value
                            }), {});


                        filteredChain.push({
                            species: chain.evolves_to[i].species.name,
                            details
                        });
                    };
                };

                chain = chain['evolves_to'][0];
            } while (chain && chain.hasOwnProperty('evolves_to'));
        };

        return {
            filteredChain: filteredChain.length > 1 ? filteredChain : []
        };
    } catch (error) {
        return { error };
    };
};

function filteringDescriptions(descriptions) {
    try {
        const formattingDescriptions = descriptions.map((item) => {
            return item = {
                text: item.flavor_text.replace(/(\n|\f)/gm, " "),
                language: item.language.name,
                version: item.version.name
            }
        });

        const englishDescriptions = formattingDescriptions.filter(({ language }) => language === 'en');

        return {
            filteredDescriptions: englishDescriptions
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
        return { filteredSpecie };
    } catch (error) {
        return { error };
    };
};

function filteringPokedexNumbers(pokedexNumbers) {
    try {
        let filteredPokedexNumbers = pokedexNumbers.map((pokedex) => {
            return pokedex = {
                entryNumber: pokedex.entry_number,
                pokedexName: pokedex.pokedex.name
            };
        });
        return { filteredPokedexNumbers };
    } catch (error) {
        return { error };
    };
};

function filteringVarietes(varieties) {
    try {
        let filteredVarietes = [];
        if (varieties?.length) {
            filteredVarietes = varieties.filter(variety => {
                if (variety.pokemon.name !== varieties[0].pokemon.name) {
                    return variety;
                };
            });

            filteredVarietes = filteredVarietes.map(variety => {
                return variety = {
                    varietyName: variety.pokemon.name
                };
            });
        };

        return { filteredVarietes };
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

        const {
            evolution_chain: evolutionChain,
            flavor_text_entries: pokemonDescriptions,
            genera: pokemonSpecies,
            habitat: { name },
            is_legendary: legendary,
            is_mythical: mythical,
            pokedex_numbers: pokedexNumbers,
            varieties
        } = await request.json();

        const {
            filteredChain, error: chainError
        } = await filteringEvolutionChain(evolutionChain);

        const {
            filteredDescriptions, error: descriptionsError
        } = filteringDescriptions(pokemonDescriptions);

        const {
            filteredSpecie, error: speciesError
        } = filteringSpecies(pokemonSpecies);

        const {
            filteredPokedexNumbers, error: pokedexNumbersError
        } = filteringPokedexNumbers(pokedexNumbers);

        const {
            filteredVarieties, error: varietiesError
        } = filteringVarietes(varieties);

        if (chainError ||
            descriptionsError ||
            speciesError ||
            pokedexNumbersError ||
            varietiesError
        ) throw {
            message: 'Error on filteringSpeciesUrl',
            status: 500
        };

        const filteredSpeciesUrl = {
            filteredChain,
            filteredDescriptions,
            filteredSpecie,
            filteredPokedexNumbers,
            filteredVarieties,
            legendary,
            mythical,
            habitat: name
        };

        return { filteredSpeciesUrl };
    } catch (error) {
        return { error };
    };
};

async function filteringPokemonData(pokemonData) {
    try {
        const {
            filteredMoves, error: errorMoves
        } = filteringMoves(pokemonData.moves);

        const {
            filteredTypes, error: errorTypes
        } = filteringTypes(pokemonData.types);

        const {
            filteredSprites, error: errorSprites
        } = filteringSprites(pokemonData.sprites);

        const {
            filteredForms, error: errorForms
        } = await filteringForms(pokemonData.forms);

        const {
            filteredSpeciesUrl: {
                filteredChain,
                filteredDescriptions,
                filteredSpecie,
                filteredPokedexNumbers,
                filteredVarieties,
                legendary,
                mythical,
                habitat
            }, error: errorSpeciesUrl
        } = await filteringSpeciesUrl(pokemonData.species);

        if (errorMoves ||
            errorTypes ||
            errorSprites ||
            errorForms ||
            errorSpeciesUrl
        ) throw {
            message: 'Error filtering Pokemon Data',
            status: 500
        };

        let newPokemonData = {
            name: pokemonData.name.toLowerCase(),
            nationaldex: pokemonData.id,
            regionaldex: filteredPokedexNumbers[1].entryNumber,
            all_dex_numbers: filteredPokedexNumbers,
            types: filteredTypes,
            descriptions: filteredDescriptions,
            habitat,
            species: filteredSpecie,
            weight: pokemonData.weight,
            height: pokemonData.height,
            location_area_encounters: pokemonData.location_area_encounters,
            abilities: pokemonData.abilities,
            moves: filteredMoves,
            evolutions: filteredChain,
            forms: filteredForms,
            varieties: filteredVarieties,
            sprites: filteredSprites,
            legendary,
            mythical,
            stats: pokemonData.stats
        };

        return { newPokemonData };
    } catch (error) {
        return { error };
    };
};

module.exports = filteringPokemonData;