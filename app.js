const btnContainer = document.querySelector('.buttons-container');
const display = document.querySelector('.display-content');
const cursor = document.querySelector('.cursor');
const errorMess = document.querySelector('.err');
const creditsBtn = document.querySelector('.s-button');
const popup = document.querySelector('.s-content');
const gitIcon = document.querySelector('.github-icon');
display.textContent = 'Hello!';

const btnData = [['clear', 'C'], ['sign', '+/-'], ['del', "\u232B"], 
                 ['n7', 7, 'num'], ['n8', 8, 'num'], ['n9', 9, 'num'], ['divide','/', 'op'],
                 ['n4', 4, 'num'], ['n5', 5, 'num'], ['n6', 6, 'num'], ['mul', '*', 'op'],
                 ['n1', 1, 'num'], ['n2', 2, 'num'], ['n3', 3, 'num'], ['sub', '-', 'op'],
                 ['n0', 0, 'num'], ['fpoint', '.'], ['equal', '='],['add', '+', 'op'],
                ];

let firstNum = '';
let secondNum = '';
let operator = '';
let last = '';
let number = 'first';

// ---------- C R E D I T S   B U T T O N ---------- //

creditsBtn.addEventListener('click', () => {
    if (creditsBtn.textContent === 'X') {
        creditsBtn.textContent = 'C';
        popup.classList.remove('s-content-popup');
        gitIcon.classList.add('opacity');
    } else {
        creditsBtn.textContent = 'X'; 
        popup.classList.add('s-content-popup');
        gitIcon.classList.remove('opacity');
    }
})



// ---------- A D D   B U T T O N S ---------- //

btnData.forEach(b => {
    let btn = document.createElement('button');
    btn.setAttribute('id', b[0]);
    if (b[2]) {
        btn.classList.add(b[2]);
    }
    btn.textContent = b[1];
    btnContainer.appendChild(btn);

    switch(true) {
        case b[2] === 'num':
            btn.addEventListener('click', () => addDigit(btn.textContent));
            break;
        case b[2] === 'op':
            btn.addEventListener('click', () => clickOp(btn.textContent));
            break;
        case b[0] === 'clear':
            btn.addEventListener('click', clickC);    
            break;
        case b[0] === 'equal':
            btn.addEventListener('click', clickEq);
            break;
        case b[0] === 'sign':
            btn.addEventListener('click', clickSign); 
            break;
        case b[0] === 'del':
            btn.addEventListener('click', backspace);
            break;
        case b[0] === 'fpoint':
            btn.addEventListener('click', clickPoint);
    }   
});

// --------- K E Y B O A R D   I N P U T ------- //

document.addEventListener('keydown', (e) => {
    console.log(e);
    let other = 'n';
    switch (true) {
        case !isNaN(e.key):
            addDigit(e.key);
            id = 'n' + e.key;
            console.log(id);
            break;
        case '/*-+'.includes(e.key):
            clickOp(e.key);
            switch (true){
                case e.key == '+':
                    id = 'add';
                    break;
                case e.key == '-':
                    id = 'sub';
                    break;
                case e.key == '*':
                    id = 'mul';
                    break;  
                case e.key == '/':
                    id = 'divide';
            }
            break;
        case e.code === 'KeyC':
            clickC();
            id = 'clear';
            break;
        case e.key === 'Enter' || e.key === '=':
            id = 'equal';
            clickEq();
            break;
        case e.key === 'Backspace':
            id = 'del';
            backspace();
            break;
        case e.key === '.':
            id = 'fpoint';
            clickPoint();  
            break;
        case e.key != 0:
            other = 'y';    
    }

    // Change button color only if valid key is pressed (keyboard)
    if (other === 'n') {
        const b = document.querySelector(`#${id}`);
        b.classList.add('active');
        setTimeout(() => {
            b.classList.remove('active');
        }, 200);  
    } 
});



// ----------------- E R R O R ---------------------------//

function displayError(mess, time=1000, small=true) {
    errorMess.textContent = mess;
    errorMess.classList.add('visible');
    if(small) {
        errorMess.classList.add('small-text');
    }
    setTimeout(() => {
        errorMess.classList.remove('visible', 'small-text');
        errorMess.textContent = '';
    }, time);
}

// ----------------- O P E R A N D S -------------------- //

function addDigit(d) {
    if (number === 'first') {
        firstNum = checkAndAdd(firstNum, d);          // [x] + y
    } else {
        secondNum = checkAndAdd(secondNum, d);        // x + [y]
    }
    cursor.classList.remove('blinking');
    console.log('f: ', firstNum, 's: ', secondNum, 'op', operator, 'last', last);
}

function checkAndAdd(num, d) {
    // Blinking feedback
    if (num === '0' && d === '0') {
        display.classList.add('half');
        setTimeout(() => display.classList.remove('half'), 100);
    }

    // Remove leading zeros
    if (num === '0' && d !== '.') {
        num = '';
    }

    // Add digit to number only if the number of digits is below 15.
    if (num.length < 15 || (num.length < 16 && num.includes('-'))) {
        num += d;
        display.textContent = num;
        last = 'num';
    } else {
        console.log('Maximum number of digits exceeded.');
        displayError('Maximum number of digits exceeded');
    }
    return num;
}

function clickSign() {
    if (number === 'first') {
        firstNum = changeSign(firstNum);
        display.textContent = firstNum;
    } else {
        secondNum = changeSign(secondNum);
        display.textContent = secondNum;
    }
    last = 'sign';
    console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
}

function changeSign(num) {
    if (!num) {
        return '-';
    } else if (num === '-') {
        return '';
    } else if (num.startsWith('-') ) {
        return num.replace('-', '');
    } else {
        return '-' + num;
    }
}

function backspace() {
    if (['', 'op'].includes(last)) {
        // pass
    } else if (number === 'first') {              // [x] + y
        firstNum = firstNum.slice(0,-1);
        display.textContent = firstNum;
        last = 'back';
    } else {                                      // x + [y]
        secondNum = secondNum.slice(0, -1);
        display.textContent = secondNum;
        last = 'back';
    }  

    if (display.textContent === '') {
        cursor.classList.add('blinking');
    }
    console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
}

function addPoint(num) {
    if (!num || num === '-') {
        addDigit('0.');
        last = '.';
    } else if (!num.includes('.')) {
        addDigit('.');
        last = '.';
    }
}

function clickPoint() {
    if (number === 'first') {
        addPoint(firstNum);
    } else {
        addPoint(secondNum);
    }
    cursor.classList.remove('blinking');
}

// ---------------- E V A L -------------------- //

function myEval(first, second, op) {
    switch (op) {
        case '+': 
            res = (+first + +second).toString();
            break;
        case '-':
            res = (first - second).toString();
            break;
        case '*': 
            res = (first * second).toString();
            break;
        case '/':
            if (second == '0'){
                console.log("Cannot divide by 0");
                res = first;
                displayError('Cannot divide by 0', 800, false);
            } else {
                res = (first / second).toString();
            }
    }

    // Prevent overflow:
    if (!res.includes('e')) {
        point = res.indexOf('.');
        if (point > 0 && point < 15) {
            res = parseFloat(Number(res).toFixed(15 - point - 1)).toString();
        } else if (res.length > 15 && !res.includes('-') || res.length > 16 && res.includes('-')) {
            res = Number(res).toExponential(12);
        } 
    } else {
        res = Number(res).toExponential(12);
    }
    return res;    
}

// ----------------- O P E R A T O R S -------------------- //

function clickOp(op) {
    if (firstNum && firstNum !== '-' && !secondNum) {        // x [+] .. 
        operator = op;
        last = 'op';
        number = 'second';

        // Blinking feedback
        display.classList.add('half');
        setTimeout(() => display.classList.remove('half'), 100);
        
        console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
    } else if (secondNum && secondNum !== '-') {             // x + y [+] ..
        firstNum = myEval(firstNum, secondNum, operator);
        display.textContent = firstNum;
        operator = op;
        last = 'op';
        secondNum = '';
        number = 'second';
        console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
    }
}

function clickEq() {
    if (['', 'op', 'eq'].includes(last)) {
        //pass
    } else if (secondNum.length > 0 && secondNum !== '-') {     // x + y [=]  => first
        firstNum = myEval(firstNum, secondNum, operator);
        display.textContent = firstNum;
        secondNum = '';
        operator = '';
        last = 'eq';
        number = 'first';
        console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
    } 
}

function clickC() {
    firstNum = '';
    secondNum = '';
    operator = '';
    display.textContent = '';
    last = '';
    number = 'first';
    cursor.classList.add('blinking');
}
    