const readFile = require('fs').readFileSync;

const INPUTS = []
readFile('input.txt', 'utf-8').split("\n").forEach(data=> {
    INPUTS.push(parseInt(data.trim()));
})

let WINDOW = INPUTS.slice(0,25);

function addToWindow(number){
    WINDOW.splice(0, 1);
    WINDOW.push(number)
}

function checkSum(number){
    let map = new Map();
    let i =0;
    while(i<WINDOW.length){
        
        if(map.has(WINDOW[i])){
            return false;
        }
        else{
            let value = number - WINDOW[i];
            map.set(value, i)
        }
        i++;

    }
    return true;
}

function findWrongValue(){
    let index = 25;
    let found = false;
    while(index < INPUTS.length){
        let number = INPUTS[index];
        found = checkSum(number);
        
        if(found){
            console.log(number);
            return number;
        }
        addToWindow(number);
        index++;
    }
    console.log("Not Found")
}

function findSubArraySumEqualToValue(target){
    let left = 0;
    let right = 1;
    let sum = INPUTS[left] + INPUTS[right];
    let toAddRight = false;
    while(left < right && left < INPUTS.length && right<INPUTS.length){
        console.log(sum)
        if(toAddRight)
        {
            sum = sum +INPUTS[right];
        }
        if(sum < target){
            right++;
            toAddRight = true;
        }
        else if(sum > target){
            sum = sum - INPUTS[left]
            left++;
            toAddRight = false;
        }
        else if(sum === target){
            console.log(INPUTS.slice(left, right+1))
            return INPUTS.slice(left, right+1);
        }
    }
    console.log("Not found")
}
let wrongNumber = findWrongValue()
let array = findSubArraySumEqualToValue(wrongNumber);
let result = Math.min(...array) + Math.max(...array);
console.log(result);