let pokemonRepository = (function () {
    let pokemonList = []; //empty array because we are going to push pokemons from link below to display inside array.
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function add(pokemon) {
        //if the pokemon has "object" "name", etc. then it will push it into the pokemonList array.
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon); //pushing it into the array
        } else {
            console.log('Pokemon is not valid.'); // if they don't have the qualities in if
        }
    }

    //getAll() allows you to have access to the objects within the repo outside of this function. 
    //Calling on getAll() is the only way to access the information in the pokemon repository.
    //
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        //query selector to surf the HTML, giving it the style of <ul>
        let pokemonList = document.querySelector(".pokemon-list");

        //styling the document into list style within the <ul> tag
        let listpokemon = document.createElement("li");

        //create a button element
        let button = document.createElement("button");
        button.innerText = pokemon.name;

        //call CSS with button-class 
        button.classList.add("button-class");

        //append child is moving the listpokemon into the button element we just created.  right?? 
        // we are appending the child to replicate what was done above into the element 
        listpokemon.appendChild(button);

        //appending the pokemon list created at the top to be with the list pokemon.
        pokemonList.appendChild(listpokemon);

        // added the event listener to the button and log to console details of which pokemon was clicked. from showDetails function.
        button.addEventListener('click', function (showDetails) {
            console.log(pokemon);

        
        })
    }
    //promise function, fetch function.
    function loadList() {
        // first we fetch the url from apiUrl variable. This is a promise
        //.then is the result of the promise is the response.
        // then we convert the response to json. 
        return fetch(apiUrl).then(function (response) {
            return response.json();
            // then we take that json and run a forEach loop on it. the new json represents basically the whole api page we inserted from bracket to bracket.
        }).then(function (json) {
            // the json, which is our whole api page/ main object, calls the .result (which comes from our api page, 
            //it's basically the name of the array). forEach of the items in json.result, we create a pokemon variable. it will take two kets
            // (name and detailsUrl)
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    // the details is a build in thing and URL comes from the api page where it is "name" and "url", so we are pulling directly from link.
                    detailsUrl: item.url
                };
                // add comes from the function we created before.
                add(pokemon);
                console.log(pokemon)
            });
            // if there are any errors in the add function we will catch it here.
        }).catch(function (e) {
            console.error(e);
        })
    }

    //function called loadDetails taking parameter of item.
    // DONT FORGET TO ADD ALL FUNCTIONS INTO THE RETURN AT THE END.
    function loadDetails(item) {
        // variable, detailsUrl is coming from line 73. and the url part of the arrays take you into details about the pokemon
        let url = item.detailsUrl;
        //returns a promise, and the response of the promise(cont'd)
        return fetch(url).then(function (response) {
            // as a json
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
        }).catch(function (e) {
            console.error(e);
        });
    }

    //showDetails function taking pokemon as parameters, 
    //then execute loadDetails function and pass pokemon as an argument in promise. then log the results of that function
    // to activate this fucniton we need to add an event click to the add list item.
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        })
    }


    //using the same name for both keys and values is good for organization
    //IIFE NOTE: let repository is equal to the return value of this entire function.
    // the curly braces around return represent the creation of new object
    // the 3 methods are the first ones names : are referencing the functions on the right side of the colon within this IIFE.
    return {
        add: add, //method is add: referencing function add
        getAll: getAll, //method is getAll: ref function getAll
        addListItem: addListItem, //method addListItem: ref function
        loadList: loadList, // we have to return all our functions! 
        loadDetails: loadDetails
    };
    //end of the IIFE , everything about this is a part of the self executing function due to the () at the end of the tag below.
})();

//add another pokemon to the array
pokemonRepository.add({ name: 'Bulbasaur', height: 2.4, type: ['grass', 'posion'] });

// when logging the pokemonRepository without getAll() it would fire the literal object of the return function.
// but due to firing getAll(), we immediatley call the getAll() function from line 36, via property on the pokemonRepository. 
// to return the array.
console.log(pokemonRepository.getAll());

//we need to pass the every new function into this botton that returns the pokemon.
pokemonRepository.loadList().then(function () { // this the load list addition
    pokemonRepository.getAll().forEach(function (pokemon) { //this is the function that returns our pokemon
        pokemonRepository.addListItem(pokemon);
    });
})