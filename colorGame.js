/*********** FUNCTION DECLARATIONS ***********/
//changes squares to same color (used for ending)
let changeColors = function(color) {
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

//generates random color in format "rgb(x, y, z)""
let randomColor = function() {
    //pick red from 0-255
    let r = Math.floor(Math.random() * 256);
    //pick green from 0-255
    let g = Math.floor(Math.random() * 256);
    //pick blue from 0-255
    let b = Math.floor(Math.random() * 256);

    //return rgb(r, g, b)
    return "rgb(" + r + ", " + g + ", " + b + ")";
}


//generates array of random colors
let generateRandomColors = function(amount) {
    //create array
    let arr = [];
    //add x random colors to array
    for(let i = 0; i < amount; i++) {
        arr.push(randomColor());
    }
    //return array
    return arr;
}

//pickColor from array of colors
let pickColor = function () {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//resets game
let reset = function() {
    //generates new array
    colors = generateRandomColors(numSquares);
    //picks goal color (shown on display)
    goalColor = pickColor();
    colorDisplay.textContent = goalColor;
    //sets default button to default text
    resetButton.textContent = "NEW COLORS";
    //loops through squares to either show/hide and associate color
    for(let i = 0; i < squares.length; i++) {
        if(colors[i]) { //if there is a color...
            squares[i].style.display = "block"; //show
            squares[i].style.backgroundColor = colors[i]; //associate color with random color array
        } else { //if there isn't a color (ie. array is only 3 long, but there's 6 squares)
            squares[i].style.display = "none"; //hide extra squares
        }
    }
    //sets background color to default
    h1.style.backgroundColor = "steelblue";
    //sets message text to empty because no moves have been made
    messageDisplay.textContent = "";
}

/*********** GAME LOGIC BEGINS HERE **********/
//selecting elements
let squares = document.querySelectorAll(".square");
let colorDisplay= document.querySelector("#color");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

//default game begins with 6 squares
let numSquares = 6;
let colors = [];
let goalColor;

reset();

/********** GAME INITIALIZATION **********/
//adding event listeners to easy/hard buttons
for(let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
        //hard-coded, remove classes from both buttons
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");

        //add selected to one button
        this.classList.add("selected");

        //if easy game, sets numSquares to 3
        if(this.textContent === "EASY") {
            numSquares = 3;
        } else {
            numSquares = 6;
        }

        //then resets board with numSquares variable
        reset();
    });
}

resetButton.addEventListener("click", function() {
    reset();
});

//adding event listener for each square
for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function(){
        //stores current square color
        let clickedColor = this.style.backgroundColor; 

        //if current square matches goal square...
        if(clickedColor === goalColor) {
            //winning logic!
            messageDisplay.textContent = "Correct!";
            changeColors(goalColor); //al squares change to goalColor
            h1.style.backgroundColor = clickedColor; //h1 changes to goalColor
            resetButton.textContent = "Play Again?";
        } else { //if selected square is wrong...
            this.style.backgroundColor = "#232323"; //fade to background
            messageDisplay.textContent = "Try again!";
        }
    });
};