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
        const currentOperatorIndex  = operatorIndex[a];//{currentoperator:6}
        const operandString = equationStrings.substring(startIndex, currentOperatorIndex);// 0 2 ||  3 4 || 
        operands.push(parseFloat(operandString));//{5}
        startIndex = currentOperatorIndex + 1;//{starIndex:5}
    }

    const lastOperands = equationStrings.substring(startIndex);
    operands.push(parseFloat(lastOperands));
    console.log(operands);
    

    //transformar em numeros(DESATIVADO POIS CONVERTE DIRETO NO LOOP AGORA)
    // const variable1 = parseFloat(operand1String);
    // const variable2 = parseFloat(operand2String);


    // // veficar se a extração foi bem-sucedida(INUTILIZADO)
    // if(isNaN(variable1) || isNaN(variable2)){
    //     displayScreen.innerText = "Conversão de numero mal sucedida"
    // }
    
    let result = 0;
    //operands{numeros},operation{tiposDeOperacao}
    switch(operation){
        case "%": result = variable1 % variable2;
        break;
        case "*": result = variable1 * variable2;
        break;
        case "+": result = variable1 + variable2;
        break;
        case "-": result = variable1 - variable2;
        break;
        case "/": result = variable1 / variable2;
        break;
        default: displayScreen.innerText = "Operation not detected" 
    }
    updateDisplayWithResult(result)
}

