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

    display.value = myEval(resultDisplay.innerHTML + display.value);
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

function myEval(expr) {
	const stackNumbers = [];
    const stackOperations = [];

    const priorityOperations = {
    	'-' : 1,
    	'+' : 1,
    	'*' : 2,
    	"/" : 2, 
    }

    let arr = devideStr(expr);


    //check if open and close brackets are equal quantity
    let openBrackets = 0;
    let closeBrackets = 0;
    for (let i = 0; i < arr.length; i++) {
    	if (arr[i] == '(') openBrackets++;
    	if (arr[i] == ')') closeBrackets++;
    }
    if ( (openBrackets != closeBrackets) && (openBrackets != 0 || closeBrackets != 0) ) throw ("ExpressionError: Brackets must be paired");
    

    
    //go throw every number and operation
    for (let i = 0; i < arr.length; i++) {
    	if (!isNaN(arr[i]))  {
    		stackNumbers.push(Number(arr[i]));
    		continue;
    	}

    	if (arr[i] == '(') {
    		stackOperations.push(arr[i]);
    		continue;
    	}

    	if (arr[i] == ')') {
    		while (stackOperations[stackOperations.length - 1] != '(') {
		    	let SecondNum = stackNumbers.pop();
		    	let firstNum = stackNumbers.pop();
		 		let operat = stackOperations.pop();

		  		countFunc(firstNum, operat, SecondNum);
  			
		    }
		    stackOperations.pop();
		    continue;
    	}

    	//if stack of operations is empty
    	if (stackOperations[0] == undefined) {	
    		stackOperations.push(arr[i]);	
    		continue;
    	}


    	let lastElemOperStack = stackOperations[stackOperations.length - 1];
 		let lastOperStackPriority = priorityOperations[lastElemOperStack];

 		let currentElement = arr[i];
 		let currentElementPriority = priorityOperations[currentElement];
 		
 		if (currentElementPriority > lastOperStackPriority) {
 			stackOperations.push(arr[i]);	
    		continue;	
 		}

    	while (lastOperStackPriority >= currentElementPriority) {
    		let SecondNum = stackNumbers.pop();
  			let firstNum = stackNumbers.pop();
  			let operat = stackOperations.pop();

  			countFunc(firstNum, operat, SecondNum);

    		lastElemOperStack = stackOperations[stackOperations.length - 1];
 			lastOperStackPriority = priorityOperations[lastElemOperStack];
    	}
    	stackOperations.push(arr[i]);

    }

    while (stackOperations[0] != undefined) {
    	let SecondNum = stackNumbers.pop();
    	let firstNum = stackNumbers.pop();
 		let operat = stackOperations.pop();

  		countFunc(firstNum, operat, SecondNum);
    }

	return stackNumbers[0];




	function devideStr(arr) {
		const re = /([\-+/*)(])/;
	    arr = arr.split(re);

	    for (i in arr) {
	    	arr[i] = arr[i].trim();
	    	if ( (arr[i] == '') || ( arr[i] == ' ') ) {
	    		arr.splice(i, 1);
	    	}
	    }

	    return arr;
	}


	function countFunc(firstNum, operat, SecondNum) {
		switch (operat) {
	  		case "+" : 
	  			stackNumbers.push(firstNum + SecondNum);
	  			break;
	  		case "-" : 
	  			stackNumbers.push(firstNum - SecondNum);
	  			break;
	  		case "*" : 
	  			stackNumbers.push(firstNum * SecondNum);
	  			break;
	  		case "/" :
	  			if (SecondNum == 0) throw("TypeError: Division by zero."); 
	  			stackNumbers.push(firstNum / SecondNum);
	  			break;
	  	}
	}
}