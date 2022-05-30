create database pokedexdb;

create table raw_pokedex(
    id serial primary key,
    name varchar(120) not null,
    pokemonUrl text not null
);

create table national_pokedex(
    id serial primary key,
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
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
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
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
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
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
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
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
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
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
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
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
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
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
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
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
    abilities text not null,
    base_experience int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dex_id int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

