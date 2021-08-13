"use strict"

function renderCoffee(coffee) {
    var html = '';
    if (coffee.roast === "light"){
        html += '<div class="col-12 col-xl-5 text-light border border-warning m-1"><h1 class="font-weight-light">' + coffee.name + '</h1><p class="font-italic">' +  coffee.roast + '</p></div>';
    }
    if (coffee.roast === "medium"){
        html += '<div class="col-12 col-xl-5 text-light border border-primary m-1"><h1 class="font-weight-light">' + coffee.name + '</h1><p class="font-italic">' +  coffee.roast + '</p></div>';
    }
    if (coffee.roast === "dark"){
        html += '<div class="col-12 col-xl-5 text-light border border m-1"><h1 class="font-weight-light">' + coffee.name + '</h1><p class="font-italic">' +  coffee.roast + '</p></div>';
    }
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for (var i = 0; i < coffees.length; i++) {
        if (coffees[i].roast === "light") {
            html += renderCoffee(coffees[i]);
        }
    }
    for (var i = 0; i < coffees.length; i++) {
        if (coffees[i].roast === "medium") {
            html += renderCoffee(coffees[i]);
        }
    }
    for (var i = 0; i < coffees.length; i++) {
        if (coffees[i].roast === "dark") {
            html += renderCoffee(coffees[i]);
        }
    }
        return html;
}

function updateCoffees(e) {
    // e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var selectedName = nameSelection.value.toLowerCase();
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (selectedRoast === 'all' && selectedName === '') {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === 'all' && coffee.name.toLowerCase().includes(selectedName)) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === coffee.roast && coffee.name.toLowerCase().includes(selectedName)) {
            filteredCoffees.push(coffee);
        }
    });
    divBody.innerHTML = renderCoffees(filteredCoffees);
}

function renderList(coffees){
    var html = '';
    coffees.forEach(function (coffee)
    {
        html += '<option>' + coffee.name + '</option>';
    })
    return html;
}

function renderRoastList(roasts){
    var html = '';
    roasts.forEach(function (roast)
    {
        html += '<option>' + roast + '</option>';
    })
    return html;
}

function addCoffee(e){
    e.preventDefault();
    var newCoffee = {
        id: coffees.length + 1,
        name: addNameSelection.value,
        roast: addRoastSelection.value,
    };
    if (/\S/.test(newCoffee.name)){
    coffees.push(newCoffee);
    updateAll();
    }
}

function deleteCoffee(e){
    e.preventDefault();
    coffees.forEach(function (coffee, index){
        if (deleteCoffeeName.value === coffee.name){
            coffees.splice(index,1);
        }
    })
    updateAll();
}

function editCoffee(e){
    e.preventDefault();
    coffees.forEach(function(coffee, index){
        if (originalCoffeeName.value === coffee.name){
            coffee.name = editedCoffeeName.value;
            coffee.roast = editedCoffeeRoast.value;
        }
    })
    updateAll();
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var roasts = [
    'light',
    'medium',
    'dark'
]

// main body
var divBody = document.querySelector('#coffees');

// searching for coffee
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var nameSelection = document.querySelector('#coffee-name');

// add a coffee
var addSubmitButton = document.querySelector('#add-submit');
var addRoastSelection = document.querySelector('#add-coffee-roast');
var addNameSelection = document.querySelector('#add-coffee-name');

// delete a coffee
var deleteCoffeeName = document.querySelector('#delete-coffee-roast')
var deleteSubmitButton = document.querySelector('#delete-submit');

// edit a coffee
var originalCoffeeName = document.querySelector('#original-coffee');
var editedCoffeeName = document.querySelector('#new-coffee-name');
var editedCoffeeRoast = document.querySelector('#new-coffee-roast');
var editSubmitButton = document.querySelector('#edit-coffee-submit');

// on submit, update coffees
submitButton.addEventListener('click', updateCoffees);
// if change selection on search, update coffees making submit button redundant
roastSelection.addEventListener('change', updateCoffees);
nameSelection.addEventListener('keyup', updateCoffees);

// buttons for add, delete, and edit
addSubmitButton.addEventListener("click", addCoffee);
deleteSubmitButton.addEventListener("click", deleteCoffee);
editSubmitButton.addEventListener('click', editCoffee);

// initialization function
function updateAll(){
    deleteCoffeeName.innerHTML = renderList(coffees);
    originalCoffeeName.innerHTML = renderList(coffees);
    editedCoffeeRoast.innerHTML = renderRoastList(roasts);
    divBody.innerHTML = renderCoffees(coffees);
    updateCoffees();
}
updateAll();


