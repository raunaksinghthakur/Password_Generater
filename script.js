const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");
const passwordDisplay= document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton]");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password= "";
let passwordLength = 10;
let checkCount=0;
handleSlider();
//streg gray default
setIndicator("#ccc");


//set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText=passwordLength; 
}

function setIndicator(color){
     indicator.style.backgroundColor= color;   
}

function getRndInterger(min,max){
   return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndInterger(0,9);

}
function generateLowerCase(){
       return  String.fromCharCode(getRndInterger(97,123));

}
function generateUpperCase(){
    return  String.fromCharCode(getRndInterger(65,91));

}
function generateSymbol(){
    const randNum = getRndInterger(0,symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked)hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked)hasSym=true;

    if(hasUpper && hasLower &&(hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    }else if(
        (hasLower || hasUpper)&&
        (hasNum || hasSym) &&
        passwordLength >=6
    ){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);  
    
}

function sufflePassword(array){
    //fisher yates method
      for(let i= array.length -1; i>0; i--){
        const j=Math.floor(Math.random() * (i+1));
        const temp= array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      let str = "";
      array.forEach((el) => (str += el));
      return str;
}

function handCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });
    //special condition
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handCheckBoxChange);
})

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value) 
     copyContent();
})

generateBtn.addEventListener('click', () =>{
    //none of the checked box are selected
    if(checkbox<=0) return;
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    //lets start the journey to find the new password 
    //remove old password
    password = "";
    //lets put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checkbox){
    //     password += generateUpperCase();
    // }

    // if(lowerrcaseCheck.checkbox){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checkbox){
    //     password += generateRandomNumber();
    // }

    // if(symbols.checkbox){
    //     password += generateSymbol();
    // }
       let funArr =[];
       if(uppercaseCheck.checkbox)
        funArr.push(generateUpperCase);
      
        if(lowercaseCheck.checkbox)
        funArr.push(generateLowerCase);

        if(numbersCheck.checkbox)
        funArr.push(generateRandomNumber);
        
        if(symbolsCheck.checked)
        funArr.push(generateSymbol);
       
        for(let i=0;i<funArr.length; i++)
        {
            password +=funArr[i]();
        }

        for(let i=0;i<passwordLength-funArr.length;i++)
        {
            let randIndex= getRndInterger(0,funArr.length);
            password += funArr[randIndex]();
        }

       //suffle the password
       password = sufflePassword(Array.from(password));
       //show password
        passwordDisplay.value = password;
        //calc
        calcStrength();

});