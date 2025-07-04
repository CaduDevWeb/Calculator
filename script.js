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
    let operation = null;
    let operatorIndex = -1;

    console.log("2. Operadores definidos:", operators);
    // achar o primeiro operador 
    for(let i=0; i < equationStrings.length;i++){
        const char = equationStrings[i];
        if(operators.includes(char)){
            operation = char;
            operatorIndex = i;
            break;
        }
    }
    // verificar se operador foi encontrado
    if(operation === null || operatorIndex === -1){
        displayScreen.innerText = "Operador nao encontrado"
        return;
    }

    // extrair os operandos da string
    const operand1String = equationStrings.substring(0, operatorIndex);
    const operand2String = equationStrings.substring(operatorIndex + 1);

    //transformar em numeros 
    const variable1 = parseFloat(operand1String);
    const variable2 = parseFloat(operand2String);


    // veficar se a extração foi bem-sucedida
    if(isNaN(variable1) || isNaN(variable2)){
        displayScreen.innerText = "Conversão de numero mal sucedida"
    }
    
    let result = 0;

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

