let pokemonRepository = (function () {
    let pokemonList = []; //empty array because we are going to push pokemons from link below to display inside array.
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //creating an add function to push pokemon that meet this promise.
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon); //pushing it into the array
        } 

    }

    //getAll() is the only way to access the information in the pokemon repository.
    function getAll() {
        return pokemonList;
    }

    //creating a button for each pokemon
    function addListItem(pokemon) {
        //query selector to surf the HTML, giving it the style of <ul>
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        //here is the event listener that will open the modal
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.imageUrl);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {                       // we need to load the results in JSON as it is a good way to communicate with the servers while we use an external API
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                // add comes from the function we created before.
                add(pokemon);
            });
            // if there are any errors in the add function we will catch it here.
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        // variable, detailsUrl is coming from line 73. and the url part of the arrays take you into details about the pokemon
        let url = item.detailsUrl;
        //returns a promise, and the response of the promise(cont'd)
        return fetch(url).then(function (response) {
            return response.json();
            //once you get the json, get a function that takes parameter details
        }).then(function (details) {
            //add the details to the item
            //item is preset from array in api? right? item is just a predefined feature?
            // imageUrl is a variable we are defining here with details, the parameters of function, sprites from api, front_default is an object within sprites in api.
            item.imageUrl = details.sprites.front_default;
            // height will equal parameters . height in API
            item.height = details.height;
            // types is a variable we are defining. types is in api, you can search for these with command f
            item.types = details.types;
            item.weight = details.weight;
        }).catch(function (e) {
            console.error(e);
        });
    }


    let modalContainer = document.querySelector('#modal-container');


    function showModal(name, height, weight, imageUrl) {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = '';
        modalBody.innerHTML = '';
        // create title element for modal
        let titleElement = document.createElement('h1');
        titleElement.innerText = name;
        // Show height in modal
        let heightElement = document.createElement('p');
        heightElement.innerText = "Height: " + height;
        let weightElement = document.createElement('p')
        weightElement.innerText = "Weight: " + weight;
        // Show image of pokemon in modal
        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        // append elements to Parent element
        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
    }


    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    // we have to return all our functions! with method : refer to function
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,

    }
})();
//end of the IIFE 

let searchBar = document.getElementById('search');
let searchButton = document.getElementById('searchButton');
let pokemonList = document.querySelector(".pokemon-list");


searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    let searchString = searchBar.value
    let filteredPokemon = pokemonRepository.getAll().filter((pokemon) => {
        return (
            pokemon.name.includes(searchString)
        );
    })
    pokemonList.innerHTML = ''
    filteredPokemon.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    });
});

    //we need to pass the every new function into this botton that returns the pokemon.
    pokemonRepository.loadList().then(function () { // this the load list addition
        pokemonRepository.getAll().forEach(function (pokemon) { //this is the function that returns our pokemon
            pokemonRepository.addListItem(pokemon);
        });
    });