$("#output").on("click", "li", function() {
  $(this).toggleClass("completed");
});

$("#output").on("click", "li", function(event) {
  $(this).fadeOut(500, function() {
      $(this).remove();
    });
  event.stopPropagation();
});

$("form").on("submit", function(event){
  event.preventDefault(); event.stopPropagation();
  var text = $("input[type='text']").val();
  $("input[type='text']").val("");
  $("#output").append(
    "<li class='list-group-item'>" + text + "</li>");
});


/*   */
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};


localforage.setDriver(localforage.INDEXEDDB);
var store = localforage.createInstance({
  name: "client"
});

var idb = {
  
  get: function(key){
    store.getItem(key).then(function(value) {
      // This code runs once the value has been loaded
      // from the offline store.
      console.log(value);
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  },
  
  update:function(key, newValue){
    store.getItem(key).then(function(value) {
      var obj = { value: newValue, date: Date.now(), modified: true }
      // This code runs once the value has been loaded
      // from the offline store.
      console.log(value);
      store.setItem(key, obj).then(function (val) {
        // Do other things once the value has been saved.
        console.log(val);
      }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
      });
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  },
  
  add:function(val){
    var obj = { value: val, date: Date.now(), modified: false  }
    store.setItem(guid(), obj).then(function (val) {
      // Do other things once the value has been saved.
      console.log(val);
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });    
  },
  
  remove:function(key){
    store.removeItem(key).then(function() {
      // Run this code once the key has been removed.
      console.log('Key is cleared!');
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  },
  
  key:function(x){
    store.key(x).then(function(keyName) {
      // Name of the key.
      console.log(keyName);
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  },
  
  keys:function(){
    store.keys().then(function(keys) {
      displayAll(keys)
      // An array of all the key names.
      console.log(keys);
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  },
  
  iterate:function(value, key, iterationNumber){
    store.iterate(function(value, key, iterationNumber) {
      // Resulting key/value pair -- this callback
      // will be executed for every item in the
      // database.
        console.log([key, value]);
      }).then(function() {
        console.log('Iteration has completed');
      }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
      });
    }
  
  
}

// For this demo I tried not to use normal event listeners to handle transactions with indexedDB
// $('form').on('submit', function(e){
//   e.preventDefault();
//   idb.add($('input').val());
//   
// });

function display(){
  store.keys().then(function(keys) {
    console.log(keys);
    keys.forEach(function(key){
      store.getItem(key).then(function(value){
        document.body.innerHTML += 
          '<div class="card" data-id="'+key+'">' +
          '<div class="card-header">' + new Date(value.date).toLocaleString() + '</div>' +
          '<div class="card-body">' + value.value + '</div>' +
          '<div class="card-footer"><button onclick="idb.remove(\''+key+'\')">delete</button>' + value.modified + '</div>' +
          '</div>';  
        console.log(value);  
      }).catch(function(err) {
        console.log(err);
      });
    })
  }).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });
}

function displayAll(keys){
  keys.forEach(function(key){
    console.log(key)
  })
}


const list = document.querySelector('#output');

// exclude
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
      if (mutation.type === 'childList') {
        if (mutation.target && [...mutation.addedNodes].length) {
          console.log(`A child node ${mutation.target} has been added!`, mutation.target);
          console.log(mutation.addedNodes[0].innerHTML);
          idb.add(mutation.addedNodes[0].innerHTML);
        }
        if(mutation.target && [...mutation.removedNodes].length){
          console.log(`A child node ${mutation.target} has been removed!`, mutation.target); 
          console.log(mutation.removedNodes[0].innerHTML);
          // remove by key
        }
        
        // console.log('Mutation Detected: A child node has been added or removed.');
      
      }
    }
}
observer.observe(list, config)
