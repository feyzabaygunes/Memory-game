const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var deneme=0;
var eslesme=0;
var saniye=0, dakika=0, saat=0;

function say(){
  if(saniye<59){
    saniye+=1;
  } else {
    saniye=0;
    if(dakika<59){
      dakika+=1;
    } else {
      dakika=0;
      saat+=1;
    }
  }
  document.getElementById(2).textContent="Süre: "+ saat +":"+dakika+":"+saniye;
}
saniye = window.setInterval("say()",1000);
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  deneme++;
  document.getElementById(1).innerText="Deneme Sayısı: "+ deneme;
  isMatch ? disableCards() : unflipCards();

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  eslesme++;
  document.getElementById(3).innerText="Eşleşme Sayısı: "+ eslesme;
  if(eslesme==6){
      document.getElementById(4).innerText="Tebrikler!";
      document.getElementById(5).innerText=deneme + " deneme, " + saat +":"+dakika+":"+saniye + " saniyede tamamladınız.";
  }
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
cards.forEach(card => card.addEventListener('click', flipCard));
