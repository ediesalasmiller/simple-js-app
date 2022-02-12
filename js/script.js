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

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >0.5){
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + 'Not a tiny pokemon!');
}else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
}
}
