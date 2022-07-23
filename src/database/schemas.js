const schemas = `

create table raw_pokedex(
    id serial primary key,
    name varchar(120) not null,
    pokemonUrl text not null
);

create table national_pokedex(
    id serial primary key,
    name varchar(120) not null,
    nationaldex int not null,
    regionaldex int not null,
    all_dex_numbers text not null,
    types text not null,
    descriptions text,
    habitat text not null,
    species text not null,
    weight int not null,
    height int not null,
    location_area_encounters text not null,
    abilities text not null,
    moves text not null,
    evolutions text,
    forms text,
    varieties text,
    sprites text,
    legendary boolean not null,
    mythical boolean not null,
    stats text not null
);

create table pokemon_variations(
    id serial primary key,
    name varchar(120) not null,
    nationaldex int not null,
    regionaldex int not null,
    all_dex_numbers text not null,
    types text not null,
    descriptions text,
    habitat text not null,
    species text not null,
    weight int not null,
    height int not null,
    location_area_encounters text not null,
    abilities text not null,
    moves text not null,
    evolutions text,
    forms text,
    varieties text,
    sprites text,
    legendary boolean not null,
    mythical boolean not null,
    stats text not null
);
`;


module.exports = schemas;