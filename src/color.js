function randomColor() {
    var r = Math.floor(Math.random() * 256), //pick a "red" from 0 - 255
        g = Math.floor(Math.random() * 256), //pick a "green" from  0 -255
        b = Math.floor(Math.random() * 256); //pick a "blue" from  0 -255
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function Color(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
}

Color.prototype = {

    innerRGB: function () {
        const r = this.r,
            g = this.g,
            b = this.b;
        return r + ", " + g + ", " + b;
    },

    rgb: function () {
        return "rgb(" + this.innerRGB() + ")";
    },

    hex: function () {
        const r = this.r,
            g = this.g,
            b = this.b;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },

    hsl: function () {
        const h = this.h,
            s = this.s,
            l = this.l;
        return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    },

    fullySaturated: function () {
        const h = this.h,
            s = this.s,
            l = this.l;
        return 'hsl(' + h + ', 100%, ' + l + '%)';
    },

    opposite: function () {
        const h = this.h,
            s = this.s,
            l = this.l;
        const newHue = (h + 180) % 360;
        return 'hsl(' + newHue + ',' + s + '%,' + '1' + '%)';
    },

    calcHSL: function () {

        var r = this.r,
            g = this.g,
            b = this.b;

        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        var cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0) h = 0;

        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;

        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;

        else
            // Blue is max
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        this.h = h;
        this.s = s;
        this.l = l;


    }


}



const red = new Color(255, 0, 0, 'red');

console.log(red.rgb());
console.log(red.hex());
