/*!
 *  Howler.js 3D Sound Demo
 *  howlerjs.com
 *
 *  (c) 2013-2019, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

'use strict';

/**
 * Setup and control all of the game's audio.
 */
var Sound = function() {
  // Setup the shared Howl.
  this.sound = new Howl({
    src: ['./assets/sprite.webm', './assets/sprite.mp3'],
    sprite: {
      lightning: [2000, 4147],
      rain: [8000, 9962, true],
      thunder: [19000, 13858],
      music: [34000, 31994, true]
    },
    volume: 0
  });

  // Begin playing background sounds.
  this.rain();
  this.thunder();
};
Sound.prototype = {
  /**
   * Play a rain loop in the background.
   */
  rain: function() {
    this._rain = this.sound.play('rain');
    this.sound.volume(0.2, this._rain);
  },

  /**
   * Randomly play thunder sounds periodically.
   */
  thunder: function() {
    setTimeout(function() {
      // Play the thunder sound in a random position.
      var x = Math.round(100 * (2 - (Math.random() * 4))) / 100;
      var y = Math.round(100 * (2 - (Math.random() * 4))) / 100;
      this._thunder = this.sound.play('thunder');
      this.sound.pos(x, y, -0.5, this._thunder);
      this.sound.volume(1, this._thunder);

      // Schedule the next clap.
      this.thunder();
    }.bind(this), 5000 + Math.round(Math.random() * 15000));
  },

  /**
   * Play lightning in a random location with a random rate/pitch.
   */
  lightning: function() {
    var x = Math.round(100 * (2.5 - (Math.random() * 5))) / 100;
    var y = Math.round(100 * (2.5 - (Math.random() * 5))) / 100;
    var rate = Math.round(100 * (0.4 + (Math.random() * 1.25))) / 100;

    // Play the lightning sound.
    var id = this.sound.play('lightning');

    // Change the position and rate.
    this.sound.pos(x, y, -0.5, id);
    this.sound.rate(rate, id);
    this.sound.volume(1, id);
  },

  /**
   * Setup a speaker in 3D space to play music from.
   * @param  {Number} x x-tile position of speaker.
   * @param  {Number} y y-tile position of speaker.
   */
  speaker: function(x, y) {
    var soundId = game.audio.sound.play('music');
    this.sound.once('play', function() {
      // Set the position of the speaker in 3D space.
      this.sound.pos(x + 0.5, y + 0.5, -0.5, soundId);
      this.sound.volume(1, soundId);

      // Tweak the attributes to get the desired effect.
      this.sound.pannerAttr({
        panningModel: 'HRTF',
        refDistance: 0.8,
        rolloffFactor: 2.5,
        distanceModel: 'exponential'
      }, soundId);
    }.bind(this), soundId);
  }
};


/*!
 *  Howler.js 3D Sound Demo
 *  howlerjs.com
 *
 *  (c) 2013-2019, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

'use strict';

/**
 * The player from which we cast the rays.
 * @param {Number} x     Starting x-position.
 * @param {Number} y     Starting y-position.
 * @param {Number} dir   Direction they are facing in radians.
 * @param {Number} speed Speed they walk at.
 */
var Player = function(x, y, dir, speed) {
  this.x = x;
  this.y = y;
  this.dir = dir;
  this.speed = speed || 3;
  this.steps = 0;
  this.hand = new Texture('./assets/gun.png', 512, 360);

  // Update the position of the audio listener.
  Howler.pos(this.x, this.y, -0.5);

  // Update the direction and orientation.
  this.rotate(dir);
};
Player.prototype = {
  /**
   * Rotate the player's viewing direction.
   * @param  {Number} angle Angle to rotate by.
   */
  rotate: function(angle) {
    this.dir = (this.dir + angle + circle) % circle;

    // Calculate the rotation vector and update the orientation of the listener.
    var x = Math.cos(this.dir);
    var y = 0;
    var z = Math.sin(this.dir);
    Howler.orientation(x, y, z, 0, 1, 0);
  },

  /**
   * Handle walking based on the state of inputs.
   * @param  {Number} dist Distance to walk based on time elapsed.
   */
  walk: function(dist) {
    var dx = Math.cos(this.dir) * dist;
    var dy = Math.sin(this.dir) * dist;

    // Move the player if they can walk here.
    this.x += (game.map.check(this.x + dx, this.y) <= 0) ? dx : 0;
    this.y += (game.map.check(this.x, this.y + dy) <= 0) ? dy : 0;

    this.steps += dist;

    // Update the position of the audio listener.
    Howler.pos(this.x, this.y, -0.5);
  },

  /**
   * Update the player position and rotation on each tick.
   * @param  {Number} secs Seconds since last update.
   */
  update: function(secs) {
    var states = game.controls.states;

    if (states.left) this.rotate(-Math.PI * secs);
    if (states.right) this.rotate(Math.PI * secs);
    if (states.front) this.walk(this.speed * secs);
    if (states.back) this.walk(-this.speed * secs);
  }
};


/*!
 *  Howler.js 3D Sound Demo
 *  howlerjs.com
 *
 *  (c) 2013-2019, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

'use strict';

/**
 * Defines and handles the various controls.
 */
var Controls = function() {
  // Define our control key codes and states.
  this.codes = {
    // Arrows
    37: 'left', 39: 'right', 38: 'front', 40: 'back',
    // WASD
    65: 'left', 68: 'right', 87: 'front', 83: 'back',
  };
  this.states = {left: false, right: false, front: false, back: false};

  // Setup the DOM listeners.
  document.addEventListener('keydown', this.key.bind(this, true), false);
  document.addEventListener('keyup', this.key.bind(this, false), false);
  document.addEventListener('touchstart', this.touch.bind(this), false);
  document.addEventListener('touchmove', this.touch.bind(this), false);
  document.addEventListener('touchend', this.touchEnd.bind(this), false);
};
Controls.prototype = {
  /**
   * Handle all keydown and keyup events and update our internal controls state.
   * @param  {Boolean} pressed Whether or not the key is being pressed.
   * @param  {Object} event   DOM event data including the key being pressed.
   */
  key: function(pressed, event) {
    var state = this.codes[event.keyCode];

    if (!state) {
      return;
    }

    this.states[state] = pressed;
    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();
  },

  /**
   * Listen for touch events and determine which key to simulate.
   * @param  {Object} event DOM event data including the position touched.
   */
  touch: function(event) {
    var touches = event.touches[0];

    // Reset the states.
    this.touchEnd(event);

    // Determine which key to simulate.
    if (touches.pageY < window.innerHeight * 0.3) {
      this.key(true, {keyCode: 38});
    } else if (touches.pageY > window.innerHeight * 0.7) {
      this.key(true, {keyCode: 40});
    } else if (touches.pageX < window.innerWidth * 0.5) {
      this.key(true, {keyCode: 37});
    } else if (touches.pageX > window.innerWidth * 0.5) {
      this.key(true, {keyCode: 39});
    }
  },

  /**
   * Fired to reset all key statuses based on no fingers being on the screen.
   * @param  {Object} event DOM event data including the position touched.
   */
  touchEnd: function(event) {
    this.states.left = false;
    this.states.right = false;
    this.states.front = false;
    this.states.back = false;

    event.preventDefault();
    event.stopPropagation();
  }
};


/*!
 *  Howler.js 3D Sound Demo
 *  howlerjs.com
 *
 *  (c) 2013-2019, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

'use strict';

/**
 * Load a texture and store its details.
 * @param {String} src Image URL.
 * @param {Number} w   Image width.
 * @param {Number} h   Image height.
 */
var Texture = function(src, w, h) {
  this.image = new Image();
  this.image.src = src;
  this.width = w;
  this.height = h;
};



/*!
 *  Howler.js 3D Sound Demo
 *  howlerjs.com
 *
 *  (c) 2013-2019, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

'use strict';

/**
 * Generates the map and calculates the casting of arrays for the camera to display on screen.
 * @param {Number} size Grid size of the map to use.
 */
var Map = function(size) {
  this.size = size;
  this.grid = new Array(size * size);
  this.skybox = new Texture('./assets/skybox.jpg', 4096, 1024);
  this.wall = new Texture('./assets/wall.jpg', 1024, 1024);
  this.speaker = new Texture('./assets/speaker.jpg', 1024, 1024);
  this.light = 0;

  // Define the pre-defined map template on a 25x25 grid.
  this.grid = [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1];
};
Map.prototype = {
  /**
   * Sets up the map including the speaker audio points.
   */
  setup: function() {
    // Loop through the tiles and setup the audio listeners.
    for (var i=0; i<this.grid.length; i++) {
      if (this.grid[i] === 2) {
        var y = Math.floor(i / this.size);
        var x = i % this.size;
        game.audio.speaker(x, y);
      }
    }
  },

  /**
   * Check if a gird location is out of bounds, a wall or empty.
   * @param  {Number} x x-coordinate
   * @param  {Number} y y-coordinate
   * @return {Number}   -1, 0, 1
   */
  check: function(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);

    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
      return -1;
    }

    return this.grid[y * this.size + x];
  },

  /**
   * Emit a ray to beginb uilding the scene.
   * @param  {Number} sin    Sine of the cast angle.
   * @param  {Number} cos    Cosine of the cast angle.
   * @param  {Number} range  Max length of the ray.
   * @param  {Object} origin x, y, height and sitance
   */
  ray: function(sin, cos, range, origin) {
    var stepX = this.step(sin, cos, origin.x, origin.y, false);
    var stepY = this.step(cos, sin, origin.y, origin.x, true);
    
    var inspectX = [sin, cos, stepX, 1, 0, origin.dist, stepX.y];
    var inspectY = [sin, cos, stepY, 0, 1, origin.dist, stepY.x];
    var next = this.inspect.apply(this, (stepX.len2 < stepY.len2) ? inspectX : inspectY);

    if (next.dist > range) {
      return [origin];
    }

    return [origin].concat(this.ray(sin, cos, range, next));
  },

  /**
   * Processes each step along the ray.
   * @param  {Number} rise     Slope of line: sine of the cast angle.
   * @param  {Number} run      Slope of line: cosine of the cast angle.
   * @param  {Number} x        Origin x-position.
   * @param  {Number} y        Origin y-position.
   * @param  {Boolean} inverted
   */
  step: function(rise, run, x, y, inverted) {
    if (run === 0) {
      return {len2: Infinity};
    }

    var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    var dy = dx * (rise / run);

    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      len2: dx * dx + dy * dy
    };
  },

  /**
   * Inspect the next position to determine distance, height, shading, etc.
   * @param  {Number} sin    Sine of the cast angle.
   * @param  {Number} cos    Cosine of the cast angle.
   * @param  {Object} step   x, y and length of the step.
   * @param  {Number} shiftX X shifted by 1 or 0.
   * @param  {Number} shiftY Y shifted by 1 or 0.
   * @param  {Number} dist   Distnace from origin.
   * @param  {Number} offset Step offset.
   */
  inspect: function(sin, cos, step, shiftX, shiftY, dist, offset) {
    var dx = (cos < 0) ? shiftX : 0;
    var dy = (sin < 0) ? shiftY : 0;

    step.type = this.check(step.x - dx, step.y - dy);
    step.height = (step.type) > 0 ? 1 : 0;
    step.dist = dist + Math.sqrt(step.len2);

    if (shiftX) {
      step.shading = (cos < 0) ? 2 : 0;
    } else {
      step.shading = (sin < 0) ? 2 : 1;
    }

    step.offset = offset - Math.floor(offset);

    return step;
  },

  /**
   * Casts a ray from the camera and returns the results.
   * @param  {Object} point Player/camera's x/y position.
   * @param  {Number} angle Angle (in radians) of camera.
   * @param  {Number} range Max length of the ray.
   */
  cast: function(point, angle, range) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    return this.ray(sin, cos, range, {
      x: point.x,
      y: point.y,
      height: 0,
      dist: 0
    });
  },

  /**
   * Update loop on the map, in this case used to add in lightning by adjusting global lighting.
   * @param  {Number} secs Seconds since last tick.
   */
  update: function(secs) {
    if (this.light > 0) {
      this.light = Math.max(this.light - 10 * secs, 0);
    } else if (Math.random() * 6 < secs) {
      this.light = 2;

      // Play the lightning sound.
      game.audio.lightning();
    }
  }
};


/*!
 *  Howler.js 3D Sound Demo
 *  howlerjs.com
 *
 *  (c) 2013-2019, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

'use strict';

/**
 * Camera that draws everything you see on the screen from the player's perspective.
 * @param {Number} resolution Resolution to render at (higher has better quality, but lower performance).
 */
var Camera = function(resolution) {
  this.width = canvas.width = window.innerWidth;
  this.height = canvas.height = window.innerHeight;
  this.resolution = resolution;
  this.spacing = this.width / resolution;
  this.focalLen = this.height / this.width;
  this.range = isMobile ? 9 : 18;
  this.lightRange = 9;
  this.scale = canvas.width / 1200;
};
Camera.prototype = {
  /**
   * Draw the skybox based on the player's direction.
   */
  drawSky: function() {
    var dir = game.player.dir;
    var sky = game.map.skybox;
    var ambient = game.map.light;
    var width = sky.width * (this.height / sky.height) * 2;
    var left = (dir / circle) * -width;

    ctx.save();
    ctx.drawImage(sky.image, left, 0, width, this.height);
    if (left < width - this.width) {
      ctx.drawImage(sky.image, left + width, 0, width, this.height);
    }
    if (ambient > 0) {
      ctx.fillStyle = '#fff';
      ctx.globalAlpha = ambient * 0.1;
      ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
    }
    ctx.restore();
  },

  /**
   * Based on the resolution, split the scene up and draw it column by column.
   */
  drawCols: function() {
    var x, angle, ray;

    ctx.save();

    for (var col=0; col<this.resolution; col++) {
      x = col / this.resolution - 0.5;
      angle = Math.atan2(x, this.focalLen);
      ray = game.map.cast(game.player, game.player.dir + angle, this.range);

      this.drawCol(col, ray, angle);
    }

    ctx.restore();
  },

  /**
   * Draw a single column of the scene.
   * @param  {Number} col   Which column in the sequence.
   * @param  {Array} ray   Ray to follow.
   * @param  {Number} angle Angle of the ray.
   */
  drawCol: function(col, ray, angle) {
    var step, drops, rain, texX, wall;
    var tex1 = game.map.wall;
    var tex2 = game.map.speaker;
    var left = Math.floor(col * this.spacing);
    var width = Math.ceil(this.spacing);
    var hit = -1;

    // Find the next wall hit.
    while (++hit < ray.length && ray[hit].height <= 0);

    // Draw the wall sections and rain drops.
    for (var i=ray.length - 1; i>=0; i--) {
      step = ray[i];
      drops = Math.pow(Math.random(), 100) * i;
      rain = (drops > 0) && this.project(0.2, angle, step.dist);

      var tex = (step.type === 1) ? tex1 : tex2;

      if (i === hit) {
        texX = Math.floor(tex.width * step.offset);
        wall = this.project(step.height, angle, step.dist);

        ctx.globalAlpha = 1;
        ctx.drawImage(tex.image, texX, 0, 1, tex.height, left, wall.top, width, wall.height);

        ctx.fillStyle = '#000';
        ctx.globalAlpha = Math.max((step.dist + step.shading) / this.lightRange - game.map.light, 0);
        ctx.fillRect(left, wall.top, width, wall.height);
      }

      ctx.fillStyle = '#fff';
      ctx.globalAlpha = 0.15;
      while (--drops > 0) {
        ctx.fillRect(left, Math.random() * rain.top, 1, rain.height);
      }
    }
  },

  /**
   * Draw the hand holding the gun and implement a "bobbing" to simulate walking.
   */
  drawHand: function() {
    var hand = game.player.hand;
    var steps = game.player.steps;
    var scaleFactor = this.scale * 6;

    // Calculate the position of each hand relative to the steps taken.
    var xScale = Math.cos(steps * 2);
    var yScale = Math.sin(steps * 4);
    var bobX = xScale * scaleFactor;
    var bobY = yScale * scaleFactor;
    var x = (canvas.width - (hand.width * this.scale) + scaleFactor) + bobX;
    var y = (canvas.height - (hand.height * this.scale) + scaleFactor) + bobY;
    var w = hand.width * this.scale;
    var h = hand.height * this.scale;

    ctx.drawImage(hand.image, x, y, w, h);
  },

  /**
   * Based on the angle and distance, determine how we are going to project the image.
   * @param  {Number} height Wall piece height.
   * @param  {Number} angle  Angle of the ray.
   * @param  {Number} dist   Distnace from the player.
   * @return {Object}        top and height
   */
  project: function(height, angle, dist) {
    var z = dist * Math.cos(angle);
    var wallH = this.height * height / z;
    var bottom = this.height / 2 * (1 + 1 / z);

    return {
      top: bottom - wallH,
      height: wallH
    };
  },

  /**
   * Render the sky, walls and hand in the correct order.
   */
  render: function() {
    this.drawSky();
    this.drawCols();
    this.drawHand();
  }
};


/*!
 *  Howler.js 3D Sound Demo
 *  howlerjs.com
 *
 *  (c) 2013-2019, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

'use strict';

// Cache some commonly used values.
var circle = Math.PI * 2;
var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk/i.test(navigator.userAgent);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/**
 * Main game class that runs the tick and sets up all other components.
 */
var Game = function() {
  this.lastTime = 0;

  // Setup our different game components.
  this.audio = new Sound();
  this.player = new Player(10, 26, Math.PI * 1.9, 2.5);
  this.controls = new Controls();
  this.map = new Map(25);
  this.camera = new Camera(isMobile ? 256 : 512);
  
  requestAnimationFrame(this.tick.bind(this));
};
Game.prototype = {
  /**
   * Main game loop that renders the full scene on each screen refresh.
   * @param  {Number} time
   */
  tick: function(time) {
    var ms = time - this.lastTime;
    this.lastTime = time;

    // Update the different components of the scene.
    this.map.update(ms / 1000);
    this.player.update(ms / 1000);
    this.camera.render(this.player, this.map);

    // Continue the game loop.
    requestAnimationFrame(this.tick.bind(this));
  }
};

// Setup and start the new game instance.
var game = new Game();

// Generate the new map.
game.map.setup();