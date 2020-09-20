const numbers = document.querySelectorAll('.number'),
      operations = document.querySelectorAll('.operator'),
      clearBtns = document.querySelectorAll('.clear-btn'),
      resultBtn = document.getElementById('result'),
      display = document.getElementById('display'),
      decimalBtn = document.getElementById('decimal');
      resultDisplay = document.getElementById('result_display');

let memoryCurrentNumber = '0',
    memoryNewNumber = false,
    isDecimalUsed = false,
    isResultDisplayEmpty = true,
    isNewNumber = false;
    isNewEquation = false;


for (let i = 0; i < numbers.length; i++) {  
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    })
}

for (let i = 0; i < operations.length; i++) {  
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    })
}

for (let i = 0; i < clearBtns.length; i++) {  
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.target.id);    
    })
}

resultBtn.addEventListener('click', function () {
    result()
    })

decimalBtn.addEventListener('click', function () {
    decimal()
    })


function numberPress(num) {
    if (memoryNewNumber == true) {
        display.value = '';
        memoryNewNumber = false;
    }

    if (display.value == '0') {
        display.value = num;
    } else if (isNewNumber) {
        display.value = num;
        isNewNumber = false;
    } else {
        display.value += num;
    }

    if (isNewEquation) {
        resultDisplay.innerHTML = '';
        isNewEquation = false;
    }
}

function decimal() {
    if (isDecimalUsed == false) {
        display.value += '.';
        isDecimalUsed = true;
    }
}

function clear(id) {
    if (id == 'c') {
        if (display.value.length == 1) {
            display.value = '0';
        } else {
            display.value = display.value.slice(0, -1);
        }
    } else if (id = 'ce') {
        display.value = '0';
        resultDisplay.innerHTML = '';
    }

    isDecimalUsed = !(Number.isInteger(Number(display.value))); 
}

function result() {
    let tempValue = display.value;

    display.value = eval(resultDisplay.innerHTML + display.value);
    resultDisplay.innerHTML += ' ' + tempValue + ' =';

    memoryNewNumber = true;
    isDecimalUsed  = false;
    isResultDisplayEmpty = true;
    isNewNumber = true;
    isNewEquation = true;
}

function operation(symbol) {
    if (isNewEquation) {
        resultDisplay.innerHTML = '';
        isNewEquation = false;
    }

    resultDisplay.innerHTML += " " + display.value + " " + symbol;
    isResultDisplayEmpty = false;
    memoryNewNumber = false;
    isDecimalUsed = false;
    isNewNumber = true;
}