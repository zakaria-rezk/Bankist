'use strict';

///////////////////////////////////////////////
///////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// methods
let currentaccount;

//create user name m
const createuser = function(accs){
  accs.forEach( function(user) {
   user.username = user.owner.toLowerCase().split(' ').map(name=> name[0]).join('');
  //  console.log(user.username);
  
  });
 
 }

 createuser(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

 const displayMove= function(movements,sort=false){
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit':'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
 
const EurToUSD =1.1;
const movmentsUSD = account1.movements.map((mov,i,arr) =>
  `mov number ${i} is ${ mov>0 ? 'depoite': 'withdrwala' } :${mov}` 
);

//update blance 
const blance =function(accmov){
const currablance =accmov.movements.reduce((acc,bla)=>acc + bla,0);
labelBalance.textContent =`${currablance} EUR`

}  
 // request laon 
const addBlance =function(currentaccount,amount){
 
  currentaccount.movements.push(Number(amount));
  blance(currentaccount);
  sumin(currentaccount)

}

const sumin=function(currentaccount){
  const absmovs =currentaccount.movements.filter(num=> num >0);
 let sum = absmovs.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
 labelSumIn.textContent = sum
}
const sumout=function(currentaccount){
  const negativenum =currentaccount.movements.filter(num => num < 0);
  console.log(negativenum);
  let sub = negativenum.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  labelSumOut.textContent =sub;

}

const flatmap =accounts.map(acc=>acc.movements).flat();
// console.log(flatmap)

//events
btnLogin.addEventListener('click',function(e){
  e.preventDefault();
   currentaccount = accounts.find(acc => acc.username === inputLoginUsername.value);

   if ( currentaccount?.pin == Number(inputLoginPin.value))
    { 
      containerApp.style.opacity=100;
     inputLoginPin.value =" ";
     //clear foucs
     inputLoginPin.blur();
      //welcome secreen
      labelWelcome.textContent =`welcome ${currentaccount.owner}`;
      //movements
      displayMove(currentaccount.movements);
      //display blance
      blance(currentaccount)
      inputLoginUsername.value ='';
      inputLoginPin.value='';
      sumin(currentaccount);
      sumout(currentaccount);
    
    
    }
});

 //transform method 
 btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  
  const amount=Number(inputTransferAmount.value);
  // console.log(currentaccount.movements + "current account2");
  // subtract the value from blnce
 currentaccount.movements.push(Number(-amount));
 // add value to account
 // inputTransferTo
 const luckyperson =accounts.find(curr => inputTransferTo.value === curr.username);
//  console.log(currentaccount.movements);
 luckyperson.movements.push(amount);
 console.log(currentaccount + "transfer")
 blance(currentaccount);
 const html=` <div class="movements__row">
  <div class="movements__type movements__type--withdrawal">${amount} withdrawal</div>
  <div class="movements__value">-${amount}€</div>
</div>`
containerMovements.insertAdjacentHTML('afterbegin',html);

inputTransferAmount.value='';
inputTransferTo.value ='';

 });

 ///// btnloan

  btnLoan.addEventListener('click',function(e){
    e.preventDefault();
    const amount=inputLoanAmount.value
   
    const html=` <div class="movements__row">
  <div class="movements__type movements__type--deposit">${amount} deposit</div>
  <div class="movements__value">${amount}€</div>
</div>`
containerMovements.insertAdjacentHTML('afterbegin',html);
blance(currentaccount);
addBlance(currentaccount,amount);
inputLoanAmount.value='';

 })
 ////// btnclose account 
 btnClose.addEventListener('click',function(e){
  e.preventDefault()
  console.log(currentaccount.username);
  console.log(currentaccount.pin);
 
  console.log(inputCloseUsername.value)
  console.log(inputClosePin.value)
  if (currentaccount.username === inputCloseUsername.value && currentaccount.pin == inputClosePin.value){
    containerApp.style.opacity= 0;
    inputCloseUsername.value='';
    inputClosePin.value='';
  }
  else {
    
    inputCloseUsername.value='';
    inputClosePin.value='';
  }
 })
 let sorted = false;
 btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMove(currentaccount.movements, !sorted);
  sorted = !sorted;
});
 labelDate.textContent=new Date().toISOString().split('T')[0];