const id = document.getElementById.bind(document);
const btnStart = id('btnStart'),
      btnStop = id('btnStop'),
      deckList = id('deck');      


const myDeck = {
  deck: [],
  drawnCards: [],
  suits: ['hearts', 'diamonds', 'spades', 'clubs'],
  values: '2,3,4,5,6,7,8,9,10,J,Q,K,A',
  initializeDeck() {
    const {
      suits,
      values,
      deck
    } = this;
    for (let value of values.split(',')) {
      for (let suit of suits) {
        deck.push({
          value,
          suit
        })
      }
    }
    // return deck;
  },
  drawCard() {
    const card = this.deck.pop();
    this.drawnCards.push(card);
    return card;
  },
  drawMultiple(numCards) {
    const cards = [];
    for (let i = 0; i < numCards; i++) {
      cards.push(this.drawCard());
    }
    return cards;
  },
  shuffle() {
    const {
      deck
    } = this;
    // loop over array backwards
    for (let i = deck.length - 1; i > 0; i--) {
      //pick random index before current element
      let j = Math.floor(Math.random() * (i + 1));
      //swap
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
}

myDeck.initializeDeck();


const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

const config = {  
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
};
    
const observer = new MutationObserver(func);
       
function func(mutations){
    for (let mutation of mutations) {
      // console.log(mutation);
      if (mutation.type === 'childList') {
        if (mutation.target && [...mutation.addedNodes].length) {
          //console.log(`A child node ${mutation.target} has been added!`, mutation.target);
          // console.log(mutation.addedNodes);
        }
        if(mutation.target && [...mutation.removedNodes].length){
          //console.log(`A child node ${mutation.target} has been removed!`, mutation.target); 
          // console.log(mutation.removedNodes);
          // remove by key
        }
        
        console.log('Mutation Detected: A child node has been added or removed.');
      
      }
    }
}

btnStart.addEventListener('click', function(){
  console.log('observing');
  observer.observe(deckList, config);
});
function startObserving(){
  observer.observe(deckList, config);  
}

btnStop.addEventListener('click', function(){
  console.log('disconnected');
  observer.disconnect();
});
function stopObserving(){
  observer.disconnect();
}


// shuffle function
function shu(){
  myDeck.shuffle();
  deckList.innerHTML = "";
  myDeck.deck.forEach(function(card){  
    deckList.innerHTML += "<li>" + card.suit + card.value + "</li>"
  });
  console.log('deck shuffled');
}


// Observer Test

// iterative, very slow and froze the dev tools
function shufs(){
  for(var i = 0;i < 1000;i++){
    shu()
  }
}

// recursive, didnt break dev tools, but dom doesnt update fast enough
function countDown(num){
    if(num <= 0) {
        console.log("All done!");
        return;
    }
    console.log(num);
    shu();
    num--;
    countDown(num);
    
}

// timed, much better good control
function recurse(num){
  if (num <= 0) {
    console.log("Complete");
    return;
  }
  num--;
  setTimeout(function(num){
  num = num || 0;      
      recurse(num);
    shu()
      console.log(num--);
  }, 3000, num);

}