//Services
const {
    servicePokedexRegion,
    serviceIndividualPokemon,
    servicePokemonVariations
} = require('../services/pokedexServices');

async function pokedexRegion(req, res) {
    let { region } = req.params;

    if (!region) return res.status(400).json({
        message: 'Region is required'
    });

    region = region.toLowerCase();

    const {
        RegionalPokedex, serviceError
    } = await servicePokedexRegion(region);

    if (serviceError) return res.status(serviceError.status).json({
        message: serviceError.message
    });

    // res.set('Cache-Control', 'public, max-age=604800');
    return res.status(200).json(RegionalPokedex);
};

async function individualPokemon(req, res) {
    const { pokemonName } = req.params;

    if (!pokemonName) return res.status(404).json({
        message: "Pokemon's name is required."
    });

    const {
        PokemonData, serviceError
    } = await serviceIndividualPokemon(pokemonName);

    if (serviceError) return res.status(serviceError.status).json({
        message: serviceError.message
    });
    res.set('Cache-Control', 'public, max-age=604800');
    return res.status(200).json(PokemonData);
};

async function pokemonVariation(req, res) {
    const { pokemonName } = req.params;

    if (!pokemonName) return res.status(400).json({
        message: 'pokemonName is required.'
    });

    const {
        PokemonVariations, serviceError
    } = await servicePokemonVariations(pokemonName);

    if (serviceError) return res.status(serviceError.status).json({
        message: serviceError.message
    });

    res.set('Cache-Control', 'public, max-age=604800');
    return res.status(200).json(PokemonVariations);
};

module.exports = {
    pokedexRegion,
    individualPokemon,
    pokemonVariation
};