/*----- constants -----*/
const SOURCE_CARDS = [
    {img: 'https://i.imgur.com/OdWrl1h.png', matched: false},
    {img: 'https://i.imgur.com/D2mAowL.png', matched: false},
    {img: 'https://i.imgur.com/HcWxaZk.png', matched: false},
    {img: 'https://i.imgur.com/LVQ52Kq.png', matched: false},
    {img: 'https://i.imgur.com/8tnZAYM.png', matched: false},
    {img: 'https://i.imgur.com/Do7D56r.png', matched: false},
    {img: 'https://i.imgur.com/TqA3cNb.png', matched: false},
    {img: 'https://i.imgur.com/C95OeJn.png', matched: false}
  ];
  const CARD_BACK = 'https://i.imgur.com/5OgVgAe.png'; 
  const DISPLAY_CARD_TIME = 1000;
  let startingMinutes = .25;
  
  
  /*----- app's state (variables) -----*/
  let cards;  // array of source cards X 2, shuffled
  let selectedCard;
  let badGuessCount;
  let ignoreClick;
  let winner;
  let time;
  let seconds;
  let loser;
  
  
  /*----- cached element references -----*/
  const cardImgEls = document.querySelectorAll('main > img');
  const badCountEl = document.querySelector('h3');
  const btnEl = document.querySelector('button');
  const countdownEl = document.getElementById('time-remaining');
  
  /*----- event listeners -----*/
  document.querySelector('main').addEventListener('click', handleChoice);
  btnEl.addEventListener('click', init);
  
  
  /*----- functions -----*/
  init();
  // Initialize Function //
  function init() {
    buildShuffledCards();
    updateCountdown();
    selectedCard = null;
    badGuessCount = 0;
    ignoreClick = false;
    winner = false;
    loser = false;
    time = startingMinutes * 60;
    render(); 
  }
  // Timer Function //
//   function updateCountdown() {
    // seconds = time % 60;
    // seconds = seconds <= 1 ? '0' + seconds : seconds;
    // countdownEl.innerHTML = `${seconds}`;
    //  time--;
    // if (seconds === '00' && !cards.every(card => card.matched)) loser = true;
    // setTimeout( checkLoser , 4600);
    // }
    function updateCountdown() {
        // let count = 3;
        // countdownEl.textContent = time;
        // countdownEl.style.visibility = 'visible';
        // countdownAudio.currentTime = 0;
        // countdownAudio.play();
        const timerId = setInterval(function () {
            seconds = time % 60;
            
            // seconds = seconds <= 1 ? '0' + seconds : seconds;
            countdownEl.innerHTML = `${seconds}`;
            time--;
            // if (time = time < 0 ? 0 : time);
            setTimeout( checkLoser , 1400);
    if (time <= 0) {
        // clearInterval(timerId);
    countdownEl.innerHTML = '0';
    // cb();
  } 
  
}, 1000);
 }
  
  function checkLoser() {
    
    loser = time === 0 && !cards.every(card => card.matched);
   if (loser) badCountEl.innerHTML = `KABOOM!!!`; 
  }
  

  // Handle Choice Function //
  function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    const card = cards[cardIdx];
    if (ignoreClick || isNaN(cardIdx) || card.matched) return;
    if (selectedCard && selectedCard === card) {
      badGuessCount++;
      selectedCard = null;
    } else if (selectedCard) {
      // check for match
      if (card.img === selectedCard.img) {
        card.matched = selectedCard.matched = true;
        selectedCard = null;
        winner = cards.every(card => card.matched);
      } else {
        ignoreClick = true;
        badGuessCount++;
        // hack/cludge SHOULD FIX!!!!//
        card.matched = true;
        setTimeout(function() {
          ignoreClick = false;
          selectedCard = null;
          card.matched = false;
          render();
        }, DISPLAY_CARD_TIME);
      }
    } else {
      selectedCard = card;
    }
    render();
  }
  //Shuffle Function//
  function buildShuffledCards() {
    const tempCards = [];
    cards = [];
    SOURCE_CARDS.forEach(function(card) {
      tempCards.push({...card}, {...card});
    });
    while (tempCards.length) {
      const rndIdx = Math.floor(Math.random() * tempCards.length);
      const rndCard = tempCards.splice(rndIdx, 1)[0];
      cards.push(rndCard);
    }
  }
  //Render Function//
  function render() {
    btnEl.style.visibility = winner ? 'visible' : 'hidden';
    cards.forEach(function(card, idx) {
      const src = card.matched || selectedCard === card ? card.img : CARD_BACK; 
      cardImgEls[idx].src = src;
    });
    badCountEl.innerHTML = `MOVES: ${badGuessCount}`;
  
    if (winner) {
      badCountEl.innerHTML = 'YOU SAVED US!!!!';
    } 
    
    
  }
