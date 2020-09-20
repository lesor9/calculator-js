const numbers = document.querySelectorAll('.number'),
      operations = document.querySelectorAll('.operator'),
      clearBtns = document.querySelectorAll('.clear-btn'),
      resultBtn = document.getElementById('result'),
      display = document.getElementById('display'),
      decimalBtn = document.getElementById('decimal');

let memoryCurrentNumber = '0',
    memoryNewNumber = false,
    memoryPendingOperation = '',
    isDecimalUsed = false; 


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
    } else {
        display.value += num;
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
    }
    
    isDecimalUsed = !(Number.isInteger(Number(display.value))); 
}

function result() {
    display.value = eval(display.value);

    memoryNewNumber = true;
    isDecimalUsed  = false;
}

function operation(symbol) {
    display.value += " " + symbol + " ";

    memoryNewNumber = false;
    isDecimalUsed = false;
}