const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  if (b === 0) {
    return "Error. Trying to divide by 0";
  } else {
    return a / b;
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
let selectedOperation = null;
let num1 = null;
let num2 = null;
let result = null;

const disableBtns = () => {
    numBtns.forEach(btn => btn.disabled = true);
    numBtns.forEach(btn => btn.style.color = 'red');
}

const disableOperateBtns = (activeBtn) => {
    operateBtns.forEach(btn => btn.style.color = '#fd8300');
    activeBtn.style.color = '#ffffff';
}

const enableBtns = () => {
    numBtns.forEach(btn => btn.disabled = false)
    numBtns.forEach(btn => btn.style.color = '#ffffff');
}

disableBtns();

operateBtns.forEach(btn =>
  btn.addEventListener("click", function() {
    document.querySelector('.operator-icon').textContent = btn.textContent;
    disableOperateBtns(btn);
    selectedOperation = btn.id;
    enableBtns();
  })
);

let timer = null;
numBtns.forEach(btn =>
  btn.addEventListener("click", function() {
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
        num1 == null
      ) {
        num1 = Number(display.textContent);
      } else {
        num2 = Number(display.textContent);
      }
      display.textContent = "";
      display.classList.toggle("second-num");
      if (num2 !== null) {
        result = operate(num1, num2);
        num1 = result;
      }
    }, 1000);
  })
);

const showResult = () => {
  display.textContent = result;
  display.classList.add("show-result");
};

resultBtn = document.querySelector(".result-btn");
resultBtn.addEventListener("click", function() {
  showResult();
});

const clear = () => {
    num1 = null;
    num2 = null;
    result = null;
    display.textContent = '';
}

document.querySelector('.clear-btn').addEventListener('click', function() {
    clear();
})

// touch events

numBtns.forEach(btn => btn.addEventListener('ontouchstart', function() { 
    btn.style.background = '#310063';
    btn.style.color = '#ffed86';
    btn.style.transform = 'scale(0.90)';
}));

numBtns.forEach(btn => btn.addEventListener('ontouchend', function() {
    btn.style.background = '#0c0018';
    btn.style.color = '#ffffff';
    btn.style.transform = 'scale(1)';
}));
