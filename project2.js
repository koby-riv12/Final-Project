const display = document.getElementById("display");

function appendToDisplay(input){	
    display.value += input;	
}

function clearDisplay(){	
    display.value =""; 	
}

function calculate(){	
    try {
        if (display.value.includes('%')) {
            display.value = display.value.replace(/%/g, '/100');  
        }
      if (display.value.includes('^')) {	
            display.value = display.value.replace(/\^/g, '**'); 
        } 
        display.value = eval(display.value);
    } catch (error) {	
        display.value = "Error";
    }
}
