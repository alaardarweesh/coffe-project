'use strict';
let sectionEl = document.getElementById("cardSection");
let formEl = document.getElementById("formId");//Id not ID
let allDrinks = [];
let tableEl = document.getElementById("tableID");
formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {


    event.preventDefault();

    let drinkName = event.target.drinkName.value
    let ingredients = event.target.ingredients.value;
    let image = event.target.image.value;
    let price = event.target.price.value;

    let cold = event.target.cold.checked;
    let hot = event.target.hot.checked;
    let ingredientsArr = ingredients.split(",");



    let newDrink = new Drink(drinkName, ingredientsArr, image, cold, hot, price);
    newDrink.render();

    saveData(allDrinks);
}

function Drink(name, ingredients, image, isCold, isHot, price) {
    this.name = name;
    this.ingredients = ingredients;
    this.image = image;
    this.isCold = isCold;
    this.isHot = isHot;
    this.price = price;

    allDrinks.push(this);
}
Drink.prototype.render = function () {

    let name = document.createElement('h3');
    name.textContent = this.name;
    sectionEl.appendChild(name)


    let imageEl = document.createElement('img');
    imageEl.src = this.image;
    sectionEl.appendChild(imageEl);


    let price = document.createElement('p');
    price.textContent = `${this.price} JD`;
    sectionEl.appendChild(price);

    let orderListEl = document.createElement("ol");
    sectionEl.appendChild(orderListEl);

    for (let i = 0; i < this.ingredients.length; i++) {
        let list = document.createElement("li");
        list.textContent = this.ingredients[i];
        orderListEl.appendChild(list)
    }
}
Drink.prototype.renderTable = function () {
    let tr = document.createElement("tr");
    tableEl.appendChild(tr);

    let nameTd = document.createElement("td");
    nameTd.textContent = this.name;
    tr.appendChild(nameTd); //Td not tD

    let priceTd = document.createElement("td");
    priceTd.textContent = this.price;
    tr.appendChild(priceTd);
}

let latte = new Drink("Latte", ["milk", "ice", "sugar"], "./assets/latte.png", true, true, 1);
let mocha = new Drink("mocha", ["milk", "coffee", "ice", "sugar"], "./assets/mocha.png", true, false, 2);
let hotChocalte = new Drink("hot chocalte", ["milk", "coffee", "ice", "sugar"], "./assets/mocha.png", true, false, 2)

function renderAll() {
    for (let i = 0; i < allDrinks.length; i++) {//< not <=
        allDrinks[i].render();
        allDrinks[i].renderTable();

    }
}

let localdebug = 0;
renderAll();


function saveData(data) {

    let stringfiyData = JSON.stringify(data);
    localStorage.setItem("drinks", stringfiyData);
}


function getData() {
    let retrievedData = localStorage.getItem("drink");


    let arrayData = JSON.parse(retrievedData);
    if (arrayData != null) {
        for (let i = allDrinks.length; i < arrayData.length; i++) {//should start from i=3 not from i=1
            new Drink(arrayData[i].name, arrayData[i].ingredients, arrayData[i].image, arrayData[i].isCol, arrayData[i].isHot, arrayData[i].price);
        }
    }
    renderAll();
}
getData();