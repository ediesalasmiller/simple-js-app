let pokemonList = [
    { 
        name: "Squirtle", 
        height: 0.5, 
        type: ['grass', 'electric']
    },
    { 
        name: "Jigglypuff", 
        height: 0.5, 
        type: ['poison', 'steel']
    },
    { 
        name: "Charmander", 
        height: 0.6, 
        type: ['ground']
    }
];

function myLoopFunction(pokemon) {
    console.log('Name: ' + pokemon.name + ' Height: ' + pokemon.height + ' Type: ' + pokemon.type);

}
pokemonList.forEach(myLoopFunction)