const schemas = `

create table raw_pokedex(
    id serial primary key,
    name varchar(120) not null,
    pokemonUrl text not null
);

create table national_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table kanto_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table johto_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table hoenn_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table sinnoh_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table unova_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table kalos_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table alola_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table galar_pokedex(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table pokemon_variations(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table pokemon_megas(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table pokemon_alolan(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table pokemon_galarian(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table pokemon_gmax(
    id serial primary key,
    name varchar(120) not null,
    abilities text not null,
    forms text not null,
    height int not null,
    dexnr int not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

`;


module.exports = schemas;