let buffer = "0";
let totalBuffer = 0;
let lastOperator = null;

document.querySelector('.calc-buttons').addEventListener('click', function(event){
    let value = event.target.innerText;
    if(!isNaN(value)){
        handleNumber(value);
        reRender();
    }
    else if(["=","C","←"].includes(value)){
        handleOperator(value);
        reRender();
    }
    else{
        handleOperator(value);
        document.querySelector('.calc-display').innerText = lastOperator;
    }
});

document.addEventListener('keypress', function(event){
    let value = event.key;
    if(!isNaN(value)){
        handleNumber(value);
    }
    switch(value){
        case "*":
            value = "×";
            handleOperator(value);
            document.querySelector('.calc-display').innerText = lastOperator;
            break;
        case "/":
            value = "÷";
            handleOperator(value);
            document.querySelector('.calc-display').innerText = lastOperator;
            break;
        case "+":
            handleOperator(value);
            document.querySelector('.calc-display').innerText = lastOperator;
            break;
        case "-":
            handleOperator(value);
            document.querySelector('.calc-display').innerText = lastOperator;
            break;
        case "=":
            handleOperator(value);
            reRender();
            break;

    }
});

document.addEventListener('keydown', function(event){
    let value = event.key;
    if(value==="Backspace"){
        handleOperator("←");
    }
    else if(value==="Enter"){
        handleOperator("=");
    }
    reRender();
});

function handleNumber(value){
    if(buffer == "0"){
        buffer = value;
    }
    else if(buffer != "0"){
        buffer += value;
    }
    reRender();
}

function handleOperator(value){
    switch(value){
        case "=":
            if(lastOperator === null){
                return;
            }
            flushOperator(parseInt(buffer));
            lastOperator = null;
            buffer = totalBuffer.toString();
            totalBuffer = 0;
            break;
        case "←":
            if(buffer.length === 1){
                buffer = "0";
            }
            else{
                buffer = buffer.substr(0,buffer.length-1);
            }
            break;
        case "C":
            buffer = "0";
            totalBuffer = 0;
            lastOperator = null;
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value){
    const intbuffer = parseInt(buffer);
    if(totalBuffer === 0){
        totalBuffer = intbuffer;
    }
    else{
        flushOperator(intbuffer);
    }

    lastOperator = value;
    buffer = "0";
    reRender();
}

function flushOperator(intbuffer){
    switch(lastOperator){
        case "×":
            totalBuffer = totalBuffer *= intbuffer;
            reRender();
            break;
        case "÷":
            totalBuffer = totalBuffer /= intbuffer;
            reRender();
            break;
        case "+":
            totalBuffer = totalBuffer += intbuffer;
            reRender();
            break;
        case "-":
            totalBuffer = totalBuffer -= intbuffer;
            reRender();
            break;
    }
}

function reRender(){
    document.querySelector('.calc-display').innerText = buffer;
}
