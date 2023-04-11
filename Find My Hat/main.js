//Get input from the user through the terminal
const prompt = require('prompt-sync')({ sigint: true });


//Clear the terminal screen
const clear = require('clear-screen');


//Create some global variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const height = 10;       //row
const width = 10;        //col


let currCharRow = 0;
let currCharCol = 0;


const field = [[]];       //An empty 2D array


function generateField() {


    for (let row = 0; row < height; row++) {
        field[row] = [];


        for (let col = 0; col < width; col++) {
            //Default is all field
            //Check for certain probability to either generate a field or a hole
            //Math.random()
            /*
            1) generate a random number between 0 to 9
            2) check if the random number < 3 then we will display a hole (-/+30%)
            3) check if the random number >=3 then we will display a field (-/+70%)
            */
            let prob = (Math.floor(Math.random() * 10));
            if (prob < 1) {
                field[row][col] = hole;
            }
            else {
                field[row][col] = fieldCharacter;
            }
        }
    }


    //Display the Character to (0,0)
    field[currCharRow][currCharCol] = pathCharacter;


    //Display the Hat in random position
    //randomise the row and col
    let row = (Math.floor(Math.random() * 10));
    let col = (Math.floor(Math.random() * 10));
    field[row][col] = hat;




}


function print() {


    clear();


    const displayString = field.map(row => {    //map
        return row.join('');
    }).join('\n');      // \n: is next line
    console.log(displayString);     //convert to string


    //getWord = displayString.toString().replace('\n', '');


} //End of print function


function askQuestion() {


    //prompt user to move the Char
    let getInput = '';

    let validInputs = ['u', 'd', 'l', 'r'];


    // to validate user input  -- other keys render invalid (strictly udlr input only)

    while (true) {

        getInput = prompt('Which way? ').toLowerCase();

        if (validInputs.includes(getInput)) {

            break;

        } else {

            console.log("Enter u, d, l, or r.");

        }

    }



    //Check if user key in u, d, l ,r
    switch (getInput) {
        case "u":
            //Move up
            currCharRow--;
            break;
        case "d":
            //Move down
            currCharRow++;
            break;
        case "l":
            currCharCol--;
            //Move left
            break;
        case "r":
            //Move right - example to be move right
            currCharCol++;
            break;
        // default:
        //     console.log('Enter u,d,l,r');   // <-- does not work

    }
}


function startGame() {


    let isPlaying = true;


    while (isPlaying) {     //(isPlaying == true)


        print();
        askQuestion();      //get up down left right
        //Check if win or lose or continue
        //Example of falling into a hole
        if (currCharRow < 0 || currCharRow >= height || currCharCol < 0 || currCharCol >= width) {
            console.log('Out of bounds! Game over.');
            isPlaying = false;

        } else if (field[currCharRow][currCharCol] == hole) {


            console.log('Sorry, you fell down a hole!');
            isPlaying = false;

        } else if (field[currCharRow][currCharCol] == hat) {
            console.log("Congrats, you found your hat!");
            isPlaying = false;

        } else field[currCharRow][currCharCol] = pathCharacter;

    }

}



generateField();    //call to generate 2D array field
startGame(); 