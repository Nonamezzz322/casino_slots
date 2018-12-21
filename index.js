/* eslint-disable linebreak-style */
const rate = document.getElementById('rate');
const alerts = document.getElementById('alerts');
const start = document.getElementById('start');
const domImages = document.getElementsByClassName('images');
const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png'];
start.disabled = true;
rate.style.border = '2px solid red';

class API {
  constructor(options) {
    this.myScore = options.myScore;
    this.randomNumbers = options.randomNumbers;
    this.domImagesLength = options.domImagesLength;
    this.imagesLength = options.imagesLength;
  }
  getRandom() {
    for (let i = 0; i < this.domImagesLength; i += 1) {
      this.randomNumbers[i] = Math.floor((Math.random() * this.imagesLength));
    }
    return this.randomNumbers;
  }
  plusScore(myRate) {
    this.myScore = this.myScore + (myRate * this.coef);
    return this.myScore;
  }
  uniqueNumbers(randomNumbers) {
    this.uniqueItems = Array.from(new Set(randomNumbers));
    return this.uniqueItems;
  }
  win(arryaR, arrayU) {
    if (arryaR.length - arrayU.length === 0) {
      this.coef = -1;
    } else if (arryaR.length - arrayU.length === 1) {
      this.coef = 1;
    } else {
      this.coef = 2;
    }
    return this.coef;
  }
  spin(myRate) {
    if (myRate > this.myScore / 2 || !myRate || myRate === 0) {
      this.spinPossibility = false;
    } else if (myRate || myRate === 1) {
      this.spinPossibility = true;
    }
    return this.spinPossibility;
  }
}

class DOM {
  constructor(options) {
    this.domImagesLength = options.domImagesLength;
  }
  drawImage(array, score) {
    for (let i = 0; i < this.domImagesLength; i += 1) {
      domImages[i].src = images[array[i]];
      domImages[i].style.transform = 'rotateX(-360deg)';
    }
    document.getElementById('score').innerText = `Общий счет: ${score}`;
  }
  validation(score) {
    if (rate.value > score / 2) {
      start.disabled = true;
      alerts.innerText = 'Нужно больше золота (максимальная ставка - половина от суммы)';
      rate.style.border = '2px solid red';
    } else if (rate.value > 0) {
      alerts.innerText = null;
      start.disabled = false;
      rate.style.border = '2px solid green';
    } else {
      alerts.innerText = 'Введите корректную ставку';
      rate.style.border = '2px solid red';
      start.disabled = true;
    }
    return this;
  }
}

const api = new API({
  myScore: 500,
  randomNumbers: [],
  domImagesLength: domImages.length,
  imagesLength: images.length,
});

const dom = new DOM({
  domImagesLength: domImages.length,
});

function clickStart() {
  start.disabled = true;
  api.spin(+rate.value);
  if (api.spin(+rate.value) === true) {
    for (let i = 0; i < domImages.length; i += 1) {
      domImages[i].style.transform = 'rotateX(360deg)';
    }
    setTimeout(() => {
      dom.validation(api.myScore);
      api.getRandom();
      api.uniqueNumbers(api.randomNumbers);
      api.win(api.randomNumbers, api.uniqueItems);
      api.plusScore(+rate.value);
      dom.drawImage(api.randomNumbers, api.myScore);
      start.disabled = false;
    }, 900);
  } else {
    dom.validation(api.myScore);
  }
}

rate.addEventListener('keyup', () => {
  dom.validation(api.myScore);
});

start.addEventListener('click', clickStart);
