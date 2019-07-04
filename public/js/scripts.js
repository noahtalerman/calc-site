function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const add = (a, b) => {
  return round((a + b), 5);
};

const subtract = (a, b) => {
  return round((a - b), 5);
};

const multiply = (a, b) => {
  return round((a * b), 5);
};

const divide = (a, b) => {
  if (b === 0) {
    return "Error";
  } else {
    return round((a / b), 5);
  }
};

const operate = (a, b) => {
  let result;
  if (selectedOperation === "add") {
    result = add(a, b);
  } else if (selectedOperation === "subtract") {
    result = subtract(a, b);
  } else if (selectedOperation === "multiply") {
    result = multiply(a, b);
  } else if (selectedOperation === "divide") {
    result = divide(a, b);
  }
  return result;
};

let numBtns = document.querySelectorAll(".num-btn");
let operateBtns = document.querySelectorAll(".operation-btn");
let display = document.querySelector(".display");
let selectedOperation = undefined;
let num1 = undefined;
let num2 = undefined;
let result = undefined;

const disableBtns = () => {
    numBtns.forEach(btn => btn.disabled = true);
    numBtns.forEach(btn => btn.style.color = 'red');
}

const disableOperateBtns = () => {
  operateBtns.forEach(btn => btn.disabled = true);
  operateBtns.forEach(btn => btn.style.color = 'red');
  resultBtn.disabled = true;
  resultBtn.style.color = 'red';
}

const shiftOperateBtns = (activeBtn) => {
    operateBtns.forEach(btn => btn.style.color = '#fd8300');
    activeBtn.style.color = '#ffffff';
}

const enableBtns = () => {
    numBtns.forEach(btn => btn.disabled = false)
    numBtns.forEach(btn => btn.style.color = '#ffffff');
}

const enableOperateBtns = (activeBtn) => {
  operateBtns.forEach(btn => btn.disabled = false);
  operateBtns.forEach(btn => btn.style.color = '#fd8300');
  activeBtn.style.color = '#ffffff';
  resultBtn.disabled = false;
  resultBtn.style.color = '#ffffff';
}

disableBtns();

let activeBtn = undefined;
operateBtns.forEach(btn =>
  btn.addEventListener("click", function() {
    resultBtn.style.background = '#ffae17';
    document.querySelector('.operator-icon').textContent = btn.textContent;
    shiftOperateBtns(btn);
    selectedOperation = btn.id;
    activeBtn = btn;
    enableBtns();
  })
);

let timer = null;
numBtns.forEach(btn =>
  btn.addEventListener("click", function() {
    resultBtn.style.background = '#ffae17';
    if (display.textContent === "Error" || display.textContent === "NaN") {
      num1 = undefined;
      num2 = undefined;
      result = undefined;
    }
    if (document.getElementsByClassName("show-result").length === 1) {
      display.textContent = "";
      display.classList.remove("show-result");
    }
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    display.textContent += btn.textContent;
    timer = setTimeout(function() {
      if (
        document.getElementsByClassName("second-num").length === 0 &&
        num1 == undefined
      ) {
        num1 = Number(display.textContent);
      } else {
        num2 = Number(display.textContent);
      }
      display.textContent = "";
      display.classList.toggle("second-num");
      if (!isNaN(num2)) {
        result = operate(num1, num2);
        num1 = result;
        document.querySelector('.running-total').textContent = result;
      }
      if (num1 === "Error" || result === "Error") {
        disableBtns();
        disableOperateBtns();
      }
    }, 1000);
  })
);

const showResult = () => {
  display.textContent = result;
  display.classList.add("show-result");
};

const resultBtn = document.querySelector(".result-btn");
resultBtn.addEventListener("click", function() {
  resultBtn.style.background = '#310063';
  showResult();
});

const clear = () => {
    num1 = undefined;
    num2 = undefined;
    result = undefined;
    display.textContent = '';
    document.querySelector('.running-total').textContent = "";
}

document.querySelector('.clear-btn').addEventListener('click', function() {
    resultBtn.style.background = '#ffae17';
    clear();
    if (resultBtn.disabled == true) {
      enableBtns();
      enableOperateBtns(activeBtn);
    }
})

// touch events
numBtns.forEach(btn => btn.addEventListener('touchstart', function() {
  if (btn.disabled == false) { 
    btn.style.background = '#310063';
    btn.style.color = '#ffed86';
    btn.style.transform = 'scale(0.80)';
  } else {
    btn.style.background = '#0c0018';
    btn.style.color = 'red';
    btn.style.transform = 'scale(1)';
  }
}));

numBtns.forEach(btn => btn.addEventListener('touchend', function() {
  if (btn.disabled == false) {
    setTimeout(function() {
      btn.style.background = '#0c0018';
      btn.style.color = '#ffffff';
      btn.style.transform = 'scale(1)';
    }, 250);
  }
}));


// viewport sizing
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
// resize event
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

document.addEventListener('touchstart', function() {
  if (numBtns.disabled == true) {
    operateBtns.style.background = 'red';
    setTimeout(function() {
      operateBtns.style.background = "#ffae17";
    }, 250);
  }
})

document.querySelector('.calculator').addEventListener('touchstart', function(e) {
  if (document.querySelector('.num-btn').disabled == true && document.querySelector('.operation-btn').disabled == false) {
    console.log(e);
    operateBtns.forEach(btn => btn.style.background = 'red');
    setTimeout(function() {
      operateBtns.forEach(btn => btn.style.background = '#ffae17');
    }, 250);
  }
});
