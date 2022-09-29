# Onyx One Pokémon task

## Getting started

First, start with reading README.md for how to start this project. Onyx One created this task based on a GraphQL workshop by Vazco.

## Task

We want you to create an app to create your ideal pokémon party. For this you will need to be able to search for pokémon, add them to your party and delete them again.

We will provide you with the UI, please connect this to the API.

We know you have limited time and understand if you're not able to complete everything within the allocated time. We want to see how you code and how you approach the task, not how fast you work.

## Requirements shortlist

- UI should be able to search for pokémon on name
- API will find these pokémon in the pokemon API
  - List of all pokémon: `https://pokeapi.co/api/v2/pokemon?limit=151`
  - Details of a pokemon by id: `https://pokeapi.co/api/v2/pokemon/${id}`
  - Return values should contain
    - id
    - name
    - image (`pokemon.sprites.front_default`)
- Server should keep 1 party in memory (no need to set up a DB, it's ok that this data is lost on server reboot)
- API should be able to
  - List the pokemon in the party
  - Add pokemon to party
  - Delete pokemon from party
- It is not allowed to add more than 6 pokemon to your party