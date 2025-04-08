// calc here

const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}

// Add keyboard support  
document.addEventListener('keydown', function(event) {  
    // Check for number keys and basic operators  
    if (event.key >= 0 && event.key <= 9) {  
        appendToDisplay(event.key);  
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {  
        appendToDisplay(event.key);  
    } else if (event.key === 'Enter' || event.key === '=') {  
        calculate();  
    } else if (event.key === 'Escape' || event.key.toLowerCase() === 'c') {  
        clearDisplay();  
    }  
});  