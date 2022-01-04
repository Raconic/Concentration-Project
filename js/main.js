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
  
  /*----- app's state (variables) -----*/
  let cards;  // array of source cards X 2, shuffled
  let selectedCard;
  let badGuessCount;
  let ignoreClick;
  let winner;
  
  /*----- cached element references -----*/
  const cardImgEls = document.querySelectorAll('main > img');
  const badCountEl = document.querySelector('h3');
  
  /*----- event listeners -----*/
  document.querySelector('main').addEventListener('click', handleChoice);
  
  /*----- functions -----*/
  init();
  
  function init() {
    buildShuffledCards();
    selectedCard = null;
    badGuessCount = 0;
    ignoreClick = false;
    winner = false;
    render();
  }
  
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
        // hack/cludge
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
  
  function render() {
    cards.forEach(function(card, idx) {
      const src = card.matched || selectedCard === card ? card.img : CARD_BACK; 
      cardImgEls[idx].src = src;
    });
    if (winner) {
      badCountEl.innerHTML = 'You Win!';
    } else {
      badCountEl.innerHTML = `Bad Count: ${badGuessCount}`;
    }
  }