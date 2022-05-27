create database pokedexdb;

create table IF NOT EXISTS raw_national_pokedex(
    id serial primary key,
    name text not null,
    url text not null,
);

create table IF NOT EXISTS national_pokedex(
    id serial primary key,
    name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
);

create table IF NOT EXISTS kanto_pokedex(
    id serial primary key,
    name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
)

create table IF NOT EXISTS johto_pokedex(
    id serial primary key,
    name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
)

create table IF NOT EXISTS hoenn_pokedex(
    id serial primary key,
    name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
)

create table IF NOT EXISTS sinnoh_pokedex(
    id serial primary key,
    name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
)

create table IF NOT EXISTS unova_pokedex(
    id serial primary key,
     name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
)

create table IF NOT EXISTS kalos_pokedex(
    id serial primary key,
    name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
)

create table IF NOT EXISTS alola_pokedex(
    id serial primary key,
    name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
)

create table IF NOT EXISTS galar_pokedex(
    id serial primary key,
    name text not null,
    abilities text not null,
    base_xp int not null,
    forms text not null,
    game_indices text not null,
    height int not null,
    held_items text not null,
    dexid int not null,
    is_default boolean not null,
    location_area_encounters text not null,
    moves text not null,
    species text not null,
    sprites text not null,
    stats text not null,
    types text not null,
    weight int not null
)

