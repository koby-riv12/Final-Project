const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value ="";
}

function calculate(){
    try {
        // check the percentage operator
        if (display.value.includes('%')) {
            display.value = display.value.replace(/%/g, '/100');  // Replace % with /100 for the percent expression
