    let pokemonRepository = (function () {
            let repository = [
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

        function add(pokemon) {
            if (
                typeof pokemon === "object" && 
                "name" in pokemon &&
                "height" in pokemon &&
                "type" in pokemon
            ) {
                repository.push(pokemon);
            } else {
                console.log('Pokemon is not valid.');
            }
        }
        
        //getAll() allows you to have access to the objects within the repo outside of this function. 
        //Calling on getAll() is the only way to access the information in the pokemon repository.
        //
        function getAll() {
            return repository;
        }
        
        //added the showDetails function to log the pokemon from the pokemonRepository.
        function showDetails(pokemon){
            console.log(pokemon);
        }

        function addListItem(pokemon){
            //query selector to surf the HTML, giving it the style of <ul>
            let pokemonList = document.querySelector(".pokemon-list");
            
            //styling the document into list style within the <ul> tag
            let listpokemon = document.createElement("li");
            
            //create a button element
            let button = document.createElement ("button");
            button.innerText = pokemon.name;
            
            //call CSS with button-class 
            button.classList.add ("button-class");
            
            //append child is moving the listpokemon into the button element we just created.  right?? 
            // we are appending the child to replicate what was done above into the element 
            listpokemon.appendChild(button);
            
            //appending the pokemon list created at the top to be with the list pokemon.
            pokemonList.appendChild(listpokemon);
            
            // added the event listener to the button and log to console details of which pokemon was clicked.
            button.addEventListener('click',function(showDetails) {
                console.log(pokemon);
            })
        }

        //using the same name for both keys and values is good for organization
         //IIFE NOTE: let repository is equal to the return value of this entire function.
           // the curly braces around return represent the creation of new object
            // the 3 methods are the first ones names : are referencing the functions on the right side of the colon within this IIFE.
        return {
            add: add, //method is add: referencing function add on line 20
            getAll: getAll, //method is getAll: ref function getAll line 36
            addListItem: addListItem //method addListItem: ref function on line 45
        };
    
        //end of the IIFE , everything about this is a part of the self executing function due to the () at the end of the tag below.
    })();

    //add another pokemon to the array
    pokemonRepository.add({ name: 'Bulbasaur', height: 2.4, type: ['grass', 'posion']  });

    // when logging the pokemonRepository without getAll() it would fire the literal object of the return function.
    // but due to firing getAll(), we immediatley call the getAll() function from line 36, via property on the pokemonRepository. 
    // to return the array.
    console.log(pokemonRepository.getAll());

    //get the pokemon list here
    pokemonRepository.getAll().forEach (function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });