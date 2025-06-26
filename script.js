const displayScreen = document.getElementById('screen');
const buttonContainer = document.getElementById('board');
const btnClear = document.getElementById('btn-clear')



buttonContainer.addEventListener('click', (event)=> {
    const clickedElement = event.target;

    if(clickedElement.classList.contains('button_board')){
        if(clickedElement.textContent === 'C'){
            buttonClear();
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

function buttonClear(){
    displayScreen.innerText = ' ';
}