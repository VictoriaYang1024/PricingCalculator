//Assume the item in adds on are unique from life experience 

//helper sum method
function sum(arr) {
    if(!arr) return 0;
    let total = 0;
    for(let i = 0; i < arr.length; i++){
        total += arr[i].price;
    }
    return total;
}

//main function
function calculator(arr) {
    const base = 24999;
    var res = [];

    //function to generate all combination
    function generateCombo(arr, cur) {
        if(sum(cur) >= 8000) {
            if(res.length == 0 || sum(cur) < sum(res)){
                res = [...cur];
            }
            return;
        }
        for(let i=0; i<arr.length; i++) {
            cur.push(arr[i]);
            if(i == arr.length -1 ){
                generateCombo([], cur);
            } else{
                generateCombo(arr.slice(i+1), cur);    
            }
            cur.pop();
        }
    }

    //calculate total adds on item price when reach first 8000
    function addDiscountedAddon(arr, set) {
        let r = 0;
        for(let i = 0; i < arr.length; i++){
            if(!set.has(arr[i])){
                r += (arr[i].price*0.5);
            }
        }
        return r;
    }

    var addOnPrice = 0;
    // if sum of price less than 8000, just sum of this do not go generate combination, early return
    if (sum(arr) <= 8000){
        addOnPrice = sum(arr);
    }else{
        generateCombo(arr, []);
        let comboSum = sum(res);
        addOnPrice = comboSum + addDiscountedAddon(arr, new Set(res));
    }
    const verhiclePrice = base + addOnPrice;
    const adminFee = 1200 + 0.02*verhiclePrice;
    const finalPrice = (1+0.13)*(verhiclePrice + adminFee);//not sure adminFee have sales tax?
                                                           //Assume yes for now

    return `The cost for this car is ${finalPrice} with the following configurations ${JSON.stringify(arr)}`;
}

//should figure out the best combination
//case1: 2500 + 2000 + 2000 + 3500 = 10000
//       10000 + 0.5*1500 + 0.5*2500 = 12000
//case2: 2500 + 2000 + 3500 = 8000
//       8000 + 0.5*2000 + 0.5*1500 + 0.5*2500 = 11000 which less than case 1
//.........           
const input1 = [{"add_on": "AWD Drivetrain", price: 2500},
               {"add_on": "GPS Navigation", price: 2000},
               {"add_on": "Winter Tire Package", price: 2000},
               {"add_on": "Sport Package", price: 3500},
               {"add_on": "Live Traffic Updates", price: 1500},
               {"add_on": "Roadside Assistance", price: 2500}];

//case adds on do not reach 8000, do not have promotion
const input2 = [{"add_on": "AWD Drivetrain", price: 2500},
               {"add_on": "Sport Package", price: 3500}];

//case adds on = 8000
const input3 = [{"add_on": "AWD Drivetrain", price: 2500},
               {"add_on": "Sport Package", price: 3500},
               {"add_on": "GPS Navigation", price: 2000}];
//case empty list
const input4 = [];

const input5 = [{"add_on": "AWD Drivetrain", price: 2500},
               {"add_on": "Sport Package", price: 6000}];


console.log(calculator(input1));
console.log(calculator(input2));
console.log(calculator(input3));
console.log(calculator(input4));
console.log(calculator(input5));