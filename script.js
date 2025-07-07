const displayScreen = document.getElementById('screen');
const buttonContainer = document.getElementById('board');
const btnClear = document.getElementById('btn-clear')
const btnResult = document.getElementById('btn-result');


buttonContainer.addEventListener('click', (event)=> {
    const clickedElement = event.target;

    if(clickedElement.classList.contains('button_board')){
        if(clickedElement.textContent === "C" || clickedElement.textContent === "="){
            switch(clickedElement.textContent){
                case "C": buttonClear();
                break;
                case "=": resultEquation();
                break;
            }
        }
        else{
            const buttonContent = clickedElement.textContent;
            updateDisplay(buttonContent);
        }
    }
});

function updateDisplay(value){
    displayScreen.textContent += value;
}

function updateDisplayWithResult(value){
    buttonClear();
    displayScreen.innerText = value;
}

function buttonClear(){
    displayScreen.innerText = ' ';
}
function resultEquation(){
    let equationStrings = displayScreen.textContent;
    const operators = ['+','-','/','*','%'];
    const priorityoperators=['/','*'];
    let operation = [];
    let operatorIndex = [];

    console.log("2. Operadores definidos:", operators);
    // 25+5+4/2
    // achar o primeiro operador 
    for(let i=0; i < equationStrings.length;i++){
        const char = equationStrings[i];
        if(operators.includes(char)){
            operation.push(char);
            operatorIndex.push(i);
        }
    }
    console.log(`Operacoes registradas: ${operation}`,`Index das operacoes: ${operatorIndex}`);
    // verificar se operador foi encontrado(DESATIVADO TEMPORARIAMENTE)
    // if(operation === null || operatorIndex === -1){
    //     displayScreen.innerText = "Operador nao encontrado"
    //     return;
    // }

    // extrair os operandos da string
    let operands = [];
    let startIndex = 0;
    for (a=0; a < operation.length;a++){
        const currentOperatorIndex  = operatorIndex[a];//{currentoperator:2}
        const operandString = equationStrings.substring(startIndex, currentOperatorIndex);// 0 2 ||  3 4 || 
        operands.push(parseFloat(operandString));
        startIndex = currentOperatorIndex + 1;
    }

    const lastOperands = equationStrings.substring(startIndex);
    operands.push(parseFloat(lastOperands));
    console.log(operands);
    
    let result = 0;
    //operands{numeros},operation{tiposDeOperacao}

    for(i=0;i < operation;i++){
        variableOperation= operation[i];
        indexOp=operatorIndex[i];
        if(variableOperation.includes(priorityoperators)){
            choiceOperation(operands[i],operands[i+1],variableOperation);
        }        
        operands.pop(operands[i]);
        operands.pop(operands[i+1]);
        operands.push(result);
        operation.pop(variableOperation)
    }
    updateDisplayWithResult(operands);
}

function choiceOperation(valor1,valor2,valor3){
    whoOperation = valor3;
    number1 = valor1;
    number2= valor2;

    switch(whoOperation){
        case "%": result = number1 % number2;
        break;
        case "*": result = number1 * number2;
        break;
        case "+": result = number1 + number2;
        break;
        case "-": result = number1 - number2;
        break;
        case "/": result = number1 / number2;
        break;
        default: displayScreen.innerText = "Operation not detected" 
    }
   return(result);
}