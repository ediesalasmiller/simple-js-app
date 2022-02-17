let pokemonRepository = (function () {
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

    return  {
        add: function(pokemon) {
            pokemonList.push(pokemon)
        },
        getAll: function() {
            return pokemonList
        }
    };
})();

pokemonRepository.add({ name: 'Bulbasaur', height: 2.4, type: ['grass', 'posion']  });


function logPokemon(pokemon) {
    document.write('Name: ' + pokemon.name + ' Height: ' + pokemon.height + ' Type: ' + pokemon.type);
}

pokemonList.getAll().forEach(logPokemon);