'use strict';
var Camera = function (resolution) {
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    this.resolution = resolution;
    this.spacing = this.width / resolution;
    this.focalLen = this.height / this.width;
    this.range = isMobile
        ? 9
        : 18;
    this.lightRange = 9;
    this.scale = canvas.width / 1200
};
Camera.prototype = {
    drawSky: function () {
        var dir = game.player.dir;
        var sky = game.map.skybox;
        var ambient = game.map.light;
        var width = sky.width * (this.height / sky.height) * 2;
        var left = (dir / circle) * -width;
        ctx.save();
        ctx.drawImage(sky.image, left, 0, width, this.height);
        if (left < width - this.width) {
            ctx.drawImage(sky.image, left + width, 0, width, this.height)
        }
        if (ambient > 0) {
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = ambient * 0.1;
            ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5)
        }
        ctx.restore()
    },
    drawCols: function () {
        var x,
            angle,
            ray;
        ctx.save();
        for (var col = 0; col < this.resolution; col += 1) {
            x = col / this.resolution - 0.5;
            angle = Math.atan2(x, this.focalLen);
            ray = game
                .map
                .cast(game.player, game.player.dir + angle, this.range);
            this.drawCol(col, ray, angle)
        }
        ctx.restore()
    },
    drawCol: function (col, ray, angle) {
        var step,
            drops,
            rain,
            texX,
            wall;
        var tex1 = game.map.wall;
        var tex2 = game.map.speaker;
        var left = Math.floor(col * this.spacing);
        var width = Math.ceil(this.spacing);
        var hit = -1;
        while (++hit < ray.length && ray[hit].height <= 0) {};
        for (var i = ray.length - 1; i >= 0; i -= 1) {
            step = ray[i];
            drops = Math.pow(Math.random(), 100) * i;
            rain = (drops > 0) && this.project(0.2, angle, step.dist);
            var tex = (step.type === 1)
                ? tex1
                : tex2;
            if (i === hit) {
                texX = Math.floor(tex.width * step.offset);
                wall = this.project(step.height, angle, step.dist);
                ctx.globalAlpha = 1;
                ctx.drawImage(tex.image, texX, 0, 1, tex.height, left, wall.top, width, wall.height);
                ctx.fillStyle = '#000';
                ctx.globalAlpha = Math.max((step.dist + step.shading) / this.lightRange - game.map.light, 0);
                ctx.fillRect(left, wall.top, width, wall.height)
            }
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 0.15;
            while (--drops > 0) {
                ctx.fillRect(left, Math.random() * rain.top, 1, rain.height)
            }
        }
    },
    drawHand: function () {
        var hand = game.player.hand;
        var steps = game.player.steps;
        var scaleFactor = this.scale * 6;
        var xScale = Math.cos(steps * 2);
        var yScale = Math.sin(steps * 4);
        var bobX = xScale * scaleFactor;
        var bobY = yScale * scaleFactor;
        var x = (canvas.width - (hand.width * this.scale) + scaleFactor) + bobX;
        var y = (canvas.height - (hand.height * this.scale) + scaleFactor) + bobY;
        var w = hand.width * this.scale;
        var h = hand.height * this.scale;
        ctx.drawImage(hand.image, x, y, w, h)
    },
    project: function (height, angle, dist) {
        var z = dist * Math.cos(angle);
        var wallH = this.height * height / z;
        var bottom = this.height / 2 * (1 + 1 / z);
        return {
            top: bottom - wallH,
            height: wallH
        }
    },
    render: function () {
        this.drawSky();
        this.drawCols();
        this.drawHand()
    }
};