

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
      var item = new Item(val);
      store.setItem(guid(), item).then(function(val){
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
      },
    
    clear:function(){
      store.clear().then(function() {
        // Run this code once the database has been entirely deleted.
        console.log('Database is now empty.');
        
        var noti = document.getElementById('notify');
        notify('Database is now empty', 'info', noti);
        
      }).catch(function(err) {
        // This code runs if there were any errors
      console.log(err);
      });
    }
    
    
  }