create database pokedexdb;

create table raw_whole_pokedex(
    id serial primary key,
    pokemonUrl text not null
);

create table whole_pokedex(
    id serial primary key,
    abilities json [] not null,
    base_xp int not null,
    forms array not null,
    game_indices json [] not null,
    height int not null,
    held_items json [] not null,
    id int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves json [] not null,
    species json not null,
    sprites json not null,
    stats json [] not null,
    types json [] not null,
    weight int not null
);