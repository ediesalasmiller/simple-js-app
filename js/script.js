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
        } else {
            console.log('Pokemon is not valid.'); // if they don't have the qualities in if
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
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item.name, item.height, item.imageUrl);
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
                console.log(pokemon)
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
        }).catch(function (e) {
            console.error(e);
        });
    }

    let modalContainer = document.querySelector('#modal-container');

    function showModal(name, height, imageUrl) {
        //creating variables to attach to my html bootstrap modal
        let modalBody = $(".modal-body");
        let modalTitle = $("modal-title");
        let modaHeader = $(".modal-header");
        //empty modal title and body for every time you open it so it doesn't just add to the last one
        modalTitle.empty();
        modalBody.empty();
        //creating element for name in modal
        let nameElement = $("<h1>" + item.name + "</h1>");
        //img in modal content
        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr("src", item.imageUrl);
        //creating element for height in modal
        let heightElement = $("<p>" + "height : " + item.height +"</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);




        //commented out my old modal
        // modalContainer.innerHTML = '';
        // let modal = document.createElement('div');
        // modal.classList.add('modal');

        // //close button
        // let closeButtonElement = document.createElement('button');
        // closeButtonElement.classList.add('modal-close');
        // closeButtonElement.innerText = 'Close';
        // closeButtonElement.addEventListener('click', hideModal);

        // let titleElement = document.createElement('h1');
        // titleElement.innerText = name;

        // let heightElement = document.createElement('p');
        // heightElement.innerText = 'Height: ' + height;

        // let imageElement = document.createElement('img');
        // imageElement.src = imageUrl;

        // modal.appendChild(closeButtonElement);
        // modal.appendChild(titleElement);
        // modal.appendChild(heightElement);
        // modal.appendChild(imageElement);
        // modalContainer.appendChild(modal);
        // modalContainer.classList.add('is-visible');
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

console.log(pokemonRepository.getAll());

//we need to pass the every new function into this botton that returns the pokemon.
pokemonRepository.loadList().then(function () { // this the load list addition
    pokemonRepository.getAll().forEach(function (pokemon) { //this is the function that returns our pokemon
        pokemonRepository.addListItem(pokemon);
    });
});
