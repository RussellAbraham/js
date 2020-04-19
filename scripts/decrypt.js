// base64.js
/**
 * Adapted from: http://www.webtoolkit.info/javascript-base64.html License:
 * http://www.webtoolkit.info/licence.html Which reads (2009-08-04): As long as
 * you leave the copyright notice of the original script, or link back to this
 * website, you can use any of the content published on this website free of
 * charge for any use: commercial or noncommercial.
 */

var Base64 = {

    keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode : function(input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3)
                    + this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode : function(input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            alert("There were invalid base64 characters in the input text.\n"
                    + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }

}; // end of Base64 namespace

// crc32.js
/**
 * From: http://www.webtoolkit.info/javascript-crc32.html License:
 * http://www.webtoolkit.info/licence.html Which reads (2009-08-04): As long as
 * you leave the copyright notice of the original script, or link back to this
 * website, you can use any of the content published on this website free of
 * charge for any use: commercial or noncommercial.
 */
/**
 * 
 * Javascript crc32 http://www.webtoolkit.info/
 * 
 */

function crc32(str, crc) { // String should be ASCII (or UTF8-encoded)
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 " + "706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 "
            + "E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 " + "90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE "
            + "1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 " + "646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 "
            + "FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 " + "A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B "
            + "35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 " + "45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A "
            + "C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 " + "B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 "
            + "2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 " + "01DB7106 98D220BC EFD5102A 71B18589 06B6B51F "
            + "9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E " + "E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 "
            + "6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED " + "1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 "
            + "8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 " + "FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 "
            + "4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A " + "346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 "
            + "AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 " + "C90C2086 5768B525 206F85B3 B966D409 CE61E49F "
            + "5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 " + "2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 "
            + "03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 " + "73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 "
            + "E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 " + "8708A3D2 1E01F268 6906C2FE F762575D 806567CB "
            + "196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A " + "67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 "
            + "D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 " + "A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C "
            + "36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF " + "4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 "
            + "CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE " + "B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 "
            + "2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C " + "026D930A 9C0906A9 EB0E363F 72076785 05005713 "
            + "95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B " + "E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 "
            + "68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 " + "18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C "
            + "8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 " + "D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 "
            + "4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 " + "37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 "
            + "BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 " + "CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 "
            + "5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B " + "2D02EF8D";

    if (typeof (crc) == "undefined") {
        crc = 0;
    }
    var x = 0;
    var y = 0;

    crc = crc ^ (-1);
    for ( var i = 0, iTop = str.length; i < iTop; i++) {
        y = (crc ^ str.charCodeAt(i)) & 0xFF;
        x = "0x" + table.substr(y * 9, 8);
        crc = (crc >>> 8) ^ x;
    }

    return crc ^ (-1);
};

// md5.cs
// from: http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt
/*
 * md5.js - MD5 Message-Digest Copyright (C) 1999,2002 Masanao Izumo
 * <iz@onicos.co.jp> Version: 2.0.0 LastModified: May 13 2002
 * 
 * This program is free software. You can redistribute it and/or modify it
 * without any warranty. This library calculates the MD5 based on RFC1321. See
 * RFC1321 for more information and algorism.
 */

/*
 * Interface: md5_128bits = MD5_hash(data); md5_hexstr = MD5_hexhash(data);
 */

/*
 * ChangeLog 2002/05/13: Version 2.0.0 released NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */

// md5_T[i] = parseInt(Math.abs(Math.sin(i)) * 4294967296.0);
var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613,
        0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
        0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6,
        0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681,
        0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085,
        0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
        0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82,
        0xbd3af235, 0x2ad7d2bb, 0xeb86d391);

var MD5_round1 = new Array(new Array(0, 7, 1), new Array(1, 12, 2), new Array(2, 17, 3), new Array(3, 22, 4),
        new Array(4, 7, 5), new Array(5, 12, 6), new Array(6, 17, 7), new Array(7, 22, 8), new Array(8, 7, 9),
        new Array(9, 12, 10), new Array(10, 17, 11), new Array(11, 22, 12), new Array(12, 7, 13),
        new Array(13, 12, 14), new Array(14, 17, 15), new Array(15, 22, 16));

var MD5_round2 = new Array(new Array(1, 5, 17), new Array(6, 9, 18), new Array(11, 14, 19), new Array(0, 20, 20),
        new Array(5, 5, 21), new Array(10, 9, 22), new Array(15, 14, 23), new Array(4, 20, 24), new Array(9, 5, 25),
        new Array(14, 9, 26), new Array(3, 14, 27), new Array(8, 20, 28), new Array(13, 5, 29), new Array(2, 9, 30),
        new Array(7, 14, 31), new Array(12, 20, 32));

var MD5_round3 = new Array(new Array(5, 4, 33), new Array(8, 11, 34), new Array(11, 16, 35), new Array(14, 23, 36),
        new Array(1, 4, 37), new Array(4, 11, 38), new Array(7, 16, 39), new Array(10, 23, 40), new Array(13, 4, 41),
        new Array(0, 11, 42), new Array(3, 16, 43), new Array(6, 23, 44), new Array(9, 4, 45), new Array(12, 11, 46),
        new Array(15, 16, 47), new Array(2, 23, 48));

var MD5_round4 = new Array(new Array(0, 6, 49), new Array(7, 10, 50), new Array(14, 15, 51), new Array(5, 21, 52),
        new Array(12, 6, 53), new Array(3, 10, 54), new Array(10, 15, 55), new Array(1, 21, 56), new Array(8, 6, 57),
        new Array(15, 10, 58), new Array(6, 15, 59), new Array(13, 21, 60), new Array(4, 6, 61), new Array(11, 10, 62),
        new Array(2, 15, 63), new Array(9, 21, 64));

function MD5_F(x, y, z) {
    return (x & y) | (~x & z);
}
function MD5_G(x, y, z) {
    return (x & z) | (y & ~z);
}
function MD5_H(x, y, z) {
    return x ^ y ^ z;
}
function MD5_I(x, y, z) {
    return y ^ (x | ~z);
}

var MD5_round = new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3),
        new Array(MD5_I, MD5_round4));

function MD5_pack(n32) {
    return String.fromCharCode(n32 & 0xff) + String.fromCharCode((n32 >>> 8) & 0xff)
            + String.fromCharCode((n32 >>> 16) & 0xff) + String.fromCharCode((n32 >>> 24) & 0xff);
}

function MD5_unpack(s4) {
    return s4.charCodeAt(0) | (s4.charCodeAt(1) << 8) | (s4.charCodeAt(2) << 16) | (s4.charCodeAt(3) << 24);
}

function MD5_number(n) {
    while (n < 0)
        n += 4294967296;
    while (n > 4294967295)
        n -= 4294967296;
    return n;
}

function MD5_apply_round(x, s, f, abcd, r) {
    var a, b, c, d;
    var kk, ss, ii;
    var t, u;

    a = abcd[0];
    b = abcd[1];
    c = abcd[2];
    d = abcd[3];
    kk = r[0];
    ss = r[1];
    ii = r[2];

    u = f(s[b], s[c], s[d]);
    t = s[a] + u + x[kk] + MD5_T[ii];
    t = MD5_number(t);
    t = ((t << ss) | (t >>> (32 - ss)));
    t += s[b];
    s[a] = MD5_number(t);
}

function MD5_hash(data) {
    var abcd, x, state, s;
    var len, index, padLen, f, r;
    var i, j, k;
    var tmp;

    state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
    len = data.length;
    index = len & 0x3f;
    padLen = (index < 56) ? (56 - index) : (120 - index);
    if (padLen > 0) {
        data += "\x80";
        for (i = 0; i < padLen - 1; i++)
            data += "\x00";
    }
    data += MD5_pack(len * 8);
    data += MD5_pack(0);
    len += padLen + 8;
    abcd = new Array(0, 1, 2, 3);
    x = new Array(16);
    s = new Array(4);

    for (k = 0; k < len; k += 64) {
        for (i = 0, j = k; i < 16; i++, j += 4) {
            x[i] = data.charCodeAt(j) | (data.charCodeAt(j + 1) << 8) | (data.charCodeAt(j + 2) << 16)
                    | (data.charCodeAt(j + 3) << 24);
        }
        for (i = 0; i < 4; i++)
            s[i] = state[i];
        for (i = 0; i < 4; i++) {
            f = MD5_round[i][0];
            r = MD5_round[i][1];
            for (j = 0; j < 16; j++) {
                MD5_apply_round(x, s, f, abcd, r[j]);
                tmp = abcd[0];
                abcd[0] = abcd[3];
                abcd[3] = abcd[2];
                abcd[2] = abcd[1];
                abcd[1] = tmp;
            }
        }

        for (i = 0; i < 4; i++) {
            state[i] += s[i];
            state[i] = MD5_number(state[i]);
        }
    }

    return MD5_pack(state[0]) + MD5_pack(state[1]) + MD5_pack(state[2]) + MD5_pack(state[3]);
}

function MD5_hexhash(data) {
    var i, out, c;
    var bit128;

    bit128 = MD5_hash(data);
    out = "";
    for (i = 0; i < 16; i++) {
        c = bit128.charCodeAt(i);
        out += "0123456789abcdef".charAt((c >> 4) & 0xf);
        out += "0123456789abcdef".charAt(c & 0xf);
    }
    return out;
}

// rc2.js
// RC2 JavaScript port by Igor Afanasyev <afan@mail.ru>
// Copyright Evernote Corporation, 2008-2009

var RC2 = {

    keyschedule : function(xkey_string, bits) {

        /* Converting the key string into array of bytes */

        var xkey = xkey_string.split("");
        for ( var i = 0; i < xkey.length; i++) {
            xkey[i] = xkey[i].charCodeAt(0);
        }

        /* 256-entry permutation table, probably derived somehow from pi */

        var permute = new Array(217, 120, 249, 196, 25, 221, 181, 237, 40, 233, 253, 121, 74, 160, 216, 157, 198, 126,
                55, 131, 43, 118, 83, 142, 98, 76, 100, 136, 68, 139, 251, 162, 23, 154, 89, 245, 135, 179, 79, 19, 97,
                69, 109, 141, 9, 129, 125, 50, 189, 143, 64, 235, 134, 183, 123, 11, 240, 149, 33, 34, 92, 107, 78,
                130, 84, 214, 101, 147, 206, 96, 178, 28, 115, 86, 192, 20, 167, 140, 241, 220, 18, 117, 202, 31, 59,
                190, 228, 209, 66, 61, 212, 48, 163, 60, 182, 38, 111, 191, 14, 218, 70, 105, 7, 87, 39, 242, 29, 155,
                188, 148, 67, 3, 248, 17, 199, 246, 144, 239, 62, 231, 6, 195, 213, 47, 200, 102, 30, 215, 8, 232, 234,
                222, 128, 82, 238, 247, 132, 170, 114, 172, 53, 77, 106, 42, 150, 26, 210, 113, 90, 21, 73, 116, 75,
                159, 208, 94, 4, 24, 164, 236, 194, 224, 65, 110, 15, 81, 203, 204, 36, 145, 175, 80, 161, 244, 112,
                57, 153, 124, 58, 133, 35, 184, 180, 122, 252, 2, 54, 91, 37, 85, 151, 49, 45, 93, 250, 152, 227, 138,
                146, 174, 5, 223, 41, 16, 103, 108, 186, 201, 211, 0, 230, 207, 225, 158, 168, 44, 99, 22, 1, 63, 88,
                226, 137, 169, 13, 56, 52, 27, 171, 51, 255, 176, 187, 72, 12, 95, 185, 177, 205, 46, 197, 243, 219,
                71, 229, 165, 156, 119, 10, 166, 32, 104, 254, 127, 193, 173);

        if (!bits)
            bits = 1024;

        /* Phase 1: Expand input key to 128 bytes */

        var len = xkey.length;
        for ( var i = len; i < 128; i++) {
            xkey[i] = permute[(xkey[i - 1] + xkey[i - len]) & 255];
        }

        /* Phase 2 - reduce effective key size to "bits" */

        var len = (bits + 7) >> 3;
        var i = 128 - len;
        var x = permute[xkey[i] & (255 >> (7 & -bits))];
        xkey[i] = x;
        while (i--) {
            x = permute[x ^ xkey[i + len]];
            xkey[i] = x;
        }

        /* Phase 3 - copy to key array of words in little-endian order */

        var key = new Array(64);
        i = 63;
        do {
            key[i] = (xkey[2 * i] & 255) + (xkey[2 * i + 1] << 8);
        } while (i--);

        return key;
    },

    decrypt_chunk : function(input, xkey) {
        var x76, x54, x32, x10, i;
        x76 = (input.charCodeAt(7) << 8) + input.charCodeAt(6);
        x54 = (input.charCodeAt(5) << 8) + input.charCodeAt(4);
        x32 = (input.charCodeAt(3) << 8) + input.charCodeAt(2);
        x10 = (input.charCodeAt(1) << 8) + input.charCodeAt(0);

        i = 15;
        do {
            x76 &= 65535;
            x76 = (x76 << 11) + (x76 >> 5);
            x76 -= (x10 & ~x54) + (x32 & x54) + xkey[4 * i + 3];

            x54 &= 65535;
            x54 = (x54 << 13) + (x54 >> 3);
            x54 -= (x76 & ~x32) + (x10 & x32) + xkey[4 * i + 2];

            x32 &= 65535;
            x32 = (x32 << 14) + (x32 >> 2);
            x32 -= (x54 & ~x10) + (x76 & x10) + xkey[4 * i + 1];

            x10 &= 65535;
            x10 = (x10 << 15) + (x10 >> 1);
            x10 -= (x32 & ~x76) + (x54 & x76) + xkey[4 * i + 0];

            if (i == 5 || i == 11) {
                x76 -= xkey[x54 & 63];
                x54 -= xkey[x32 & 63];
                x32 -= xkey[x10 & 63];
                x10 -= xkey[x76 & 63];
            }
        } while (i--);

        var out = String.fromCharCode(x10 & 255) + String.fromCharCode((x10 >> 8) & 255)
                + String.fromCharCode(x32 & 255) + String.fromCharCode((x32 >> 8) & 255)
                + String.fromCharCode(x54 & 255) + String.fromCharCode((x54 >> 8) & 255)
                + String.fromCharCode(x76 & 255) + String.fromCharCode((x76 >> 8) & 255);

        return out;
    },

    decrypt : function(str, key, bits) {
        var out = "";
        var key_array = this.keyschedule(key, bits);

        while (str.length > 0) {
            var chunk = str.slice(0, 8);
            str = str.slice(8);
            out = out + this.decrypt_chunk(chunk, key_array);
        }

        return out;
    }

}; // end of RC2 namespace

// utf8.js
/**
 * Adapted from: http://www.webtoolkit.info/javascript-base64.html License:
 * http://www.webtoolkit.info/licence.html Which reads (2009-08-04): As long as
 * you leave the copyright notice of the original script, or link back to this
 * website, you can use any of the content published on this website free of
 * charge for any use: commercial or noncommercial.
 */
/**
 * 
 * UTF-8 data encode / decode http://www.webtoolkit.info/
 * 
 */

var Utf8 = {

    // public method for url encoding
    encode : function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for ( var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // public method for url decoding
    decode : function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};

// en-crypt.js
// EN-Crypt helper logic by Igor Afanasyev <afan@mail.ru>
// Copyright Evernote Corporation, 2008-2009
var ENCrypt = {

    EN_RC2_ENCRYPTION_KEYSIZE : 64,

    rc2_decrypt : function(base64str, passphrase) {
        // Password is UTF8-encoded before MD5 is calculated.
        // MD5 is used in raw (not hex-encoded) form.

        var str = RC2.decrypt(Base64.decode(base64str), MD5_hash(Utf8.encode(passphrase)),
                this.EN_RC2_ENCRYPTION_KEYSIZE);

        // First 4 chars of the string is the HEX-representation of the
        // upper-byte of the CRC32 of the string.
        // If CRC32 is valid, we return the decoded string, otherwise return
        // null

        var crc = str.slice(0, 4);
        str = str.slice(4);

        var realcrc = crc32(str) ^ (-1); // Windows client implementation of
        // CRC32 is broken, hence the " ^
        // (-1)" fix
        realcrc = realcrc >>> 0; // trick to make value an uint before
        // converting to hex
        realcrc = this.d2h(realcrc).substring(0, 4).toUpperCase(); // convert
        // to hex,
        // take only
        // first 4
        // uppercase
        // hex
        // digits to
        // compare

        if (realcrc == crc) {

            // Get rid of zero symbols at the end of the string, if any

            while ((str.length > 0) && (str.charCodeAt(str.length - 1) == 0))
                str = str.slice(0, str.length - 1);

            // Return Unicode string

            return Utf8.decode(str);

        } else {
            return '';
        }
    },

    d2h : function(d) {
        return d.toString(16);
    },

    aes_decrypt : function(base64str, passphrase) {

        // This is required in order to make CBC work
        sjcl.beware["CBC mode is dangerous because it doesn't protect message integrity."]();

        // Evernote Crypto Settings
        var EN_ITERATIONS = 50 * 1000;
        var EN_KEYSIZE = 128;
        var EN_CIPHER = "aes";
        var EN_MODE = "cbc";
        var EN_HMACSIZE = 32 * 8;
        var EN_IDENT = "ENC0";

        function enCalculateKey(password, salt) {
            return sjcl.misc.pbkdf2(password, salt, EN_ITERATIONS, EN_KEYSIZE);
        }

        function enDecrypt(password, data) {
            if (typeof data === "string") {
                data = sjcl.codec.base64.toBits(data);
            }

            var cursor = 8 * EN_IDENT.length;

            // var info = sjcl.bitArray.bitSlice(data, 0, cursor);
            if (EN_IDENT !== sjcl.codec.utf8String.fromBits([ data[0] ])) {
                console.error("No Evernote crypto data.");
                return "";
            }

            var salt = sjcl.bitArray.bitSlice(data, cursor, cursor + EN_KEYSIZE);
            cursor += EN_KEYSIZE;

            var saltHMAC = sjcl.bitArray.bitSlice(data, cursor, cursor + EN_KEYSIZE);
            cursor += EN_KEYSIZE;

            var iv = sjcl.bitArray.bitSlice(data, cursor, cursor + EN_KEYSIZE);
            cursor += EN_KEYSIZE;

            var dataLen = sjcl.bitArray.bitLength(data);
            var ct = sjcl.bitArray.bitSlice(data, cursor, dataLen - EN_HMACSIZE);
            cursor += dataLen - 32 * 8 - cursor;

            var hmacExpected = sjcl.bitArray.bitSlice(data, cursor, cursor + EN_HMACSIZE);

            // console.log("info", dataLen, salt, saltHMAC, iv, ct, hmac);

            // Check validity
            var keyHMAC = enCalculateKey(password, saltHMAC);
            var hmac = new sjcl.misc.hmac(keyHMAC).encrypt(sjcl.bitArray.bitSlice(data, 0, dataLen - EN_HMACSIZE));
            if (!sjcl.bitArray.equal(hmac, hmacExpected)) {
                console.error("Wrong checksum.", hmac, hmacExpected);
                return "";
            }

            // Decrypt
            var key = enCalculateKey(password, salt);
            var prp = new sjcl.cipher[EN_CIPHER](key);
            var result = sjcl.mode[EN_MODE].decrypt(prp, ct, iv);

            return sjcl.codec.utf8String.fromBits(result);
        }

        function enEncrypt(password, plaintext) {
            if (typeof plaintext === "string") {
                plaintext = sjcl.codec.utf8String.toBits(plaintext);
            }

            // Generate key
            var salt = sjcl.random.randomWords(4, 0);
            var saltHMAC = sjcl.random.randomWords(4, 0);

            var key = enCalculateKey(password, salt);
            var keyHMAC = enCalculateKey(password, saltHMAC);

            // Encrypt
            var iv = sjcl.random.randomWords(4, 0);
            var prp = new sjcl.cipher[EN_CIPHER](key);
            var ct = sjcl.mode[EN_MODE].encrypt(prp, plaintext, iv);

            var result = [].concat(sjcl.codec.utf8String.toBits(EN_IDENT), salt, saltHMAC, iv, ct);

            var hmac = new sjcl.misc.hmac(keyHMAC).encrypt(result);
            result = result.concat(hmac);

            var data = sjcl.codec.base64.fromBits(result);
            return data;
        }

        function $(id) {
            return document.getElementById(id);
        }

        return enDecrypt(passphrase, base64str);
    }
};
// end of ENCrypt namespace


/*
 * [hi-base32]{@link https://github.com/emn178/hi-base32}
 *
 * @version 0.5.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
!function(){"use strict";var r="object"==typeof window?window:{};!r.HI_BASE32_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node&&(r=global);var t=!r.HI_BASE32_NO_COMMON_JS&&"object"==typeof module&&module.exports,a="function"==typeof define&&define.amd,e="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split(""),o={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,2:26,3:27,4:28,5:29,6:30,7:31},h=[0,0,0,0,0,0,0,0],c=function(r,t){t.length>10&&(t="..."+t.substr(-10));var a=new Error("Decoded data is not valid UTF-8. Maybe try base32.decode.asBytes()? Partial data after reading "+r+" bytes: "+t+" <-");throw a.position=r,a},n=function(r){if(!/^[A-Z2-7=]+$/.test(r))throw new Error("Invalid base32 characters");for(var t,a,e,h,c,n,A,d,C=[],i=0,f=(r=r.replace(/=/g,"")).length,s=0,g=f>>3<<3;s<g;)t=o[r.charAt(s++)],a=o[r.charAt(s++)],e=o[r.charAt(s++)],h=o[r.charAt(s++)],c=o[r.charAt(s++)],n=o[r.charAt(s++)],A=o[r.charAt(s++)],d=o[r.charAt(s++)],C[i++]=255&(t<<3|a>>>2),C[i++]=255&(a<<6|e<<1|h>>>4),C[i++]=255&(h<<4|c>>>1),C[i++]=255&(c<<7|n<<2|A>>>3),C[i++]=255&(A<<5|d);var u=f-g;return 2===u?(t=o[r.charAt(s++)],a=o[r.charAt(s++)],C[i++]=255&(t<<3|a>>>2)):4===u?(t=o[r.charAt(s++)],a=o[r.charAt(s++)],e=o[r.charAt(s++)],h=o[r.charAt(s++)],C[i++]=255&(t<<3|a>>>2),C[i++]=255&(a<<6|e<<1|h>>>4)):5===u?(t=o[r.charAt(s++)],a=o[r.charAt(s++)],e=o[r.charAt(s++)],h=o[r.charAt(s++)],c=o[r.charAt(s++)],C[i++]=255&(t<<3|a>>>2),C[i++]=255&(a<<6|e<<1|h>>>4),C[i++]=255&(h<<4|c>>>1)):7===u&&(t=o[r.charAt(s++)],a=o[r.charAt(s++)],e=o[r.charAt(s++)],h=o[r.charAt(s++)],c=o[r.charAt(s++)],n=o[r.charAt(s++)],A=o[r.charAt(s++)],C[i++]=255&(t<<3|a>>>2),C[i++]=255&(a<<6|e<<1|h>>>4),C[i++]=255&(h<<4|c>>>1),C[i++]=255&(c<<7|n<<2|A>>>3)),C},A=function(r,t){if(!t)return function(r){for(var t,a,e="",o=r.length,h=0,n=0;h<o;)if((t=r[h++])<=127)e+=String.fromCharCode(t);else{t>191&&t<=223?(a=31&t,n=1):t<=239?(a=15&t,n=2):t<=247?(a=7&t,n=3):c(h,e);for(var A=0;A<n;++A)((t=r[h++])<128||t>191)&&c(h,e),a<<=6,a+=63&t;a>=55296&&a<=57343&&c(h,e),a>1114111&&c(h,e),a<=65535?e+=String.fromCharCode(a):(a-=65536,e+=String.fromCharCode(55296+(a>>10)),e+=String.fromCharCode(56320+(1023&a)))}return e}(n(r));if(!/^[A-Z2-7=]+$/.test(r))throw new Error("Invalid base32 characters");var a,e,h,A,d,C,i,f,s="",g=r.indexOf("=");-1===g&&(g=r.length);for(var u=0,S=g>>3<<3;u<S;)a=o[r.charAt(u++)],e=o[r.charAt(u++)],h=o[r.charAt(u++)],A=o[r.charAt(u++)],d=o[r.charAt(u++)],C=o[r.charAt(u++)],i=o[r.charAt(u++)],f=o[r.charAt(u++)],s+=String.fromCharCode(255&(a<<3|e>>>2))+String.fromCharCode(255&(e<<6|h<<1|A>>>4))+String.fromCharCode(255&(A<<4|d>>>1))+String.fromCharCode(255&(d<<7|C<<2|i>>>3))+String.fromCharCode(255&(i<<5|f));var m=g-S;return 2===m?(a=o[r.charAt(u++)],e=o[r.charAt(u++)],s+=String.fromCharCode(255&(a<<3|e>>>2))):4===m?(a=o[r.charAt(u++)],e=o[r.charAt(u++)],h=o[r.charAt(u++)],A=o[r.charAt(u++)],s+=String.fromCharCode(255&(a<<3|e>>>2))+String.fromCharCode(255&(e<<6|h<<1|A>>>4))):5===m?(a=o[r.charAt(u++)],e=o[r.charAt(u++)],h=o[r.charAt(u++)],A=o[r.charAt(u++)],d=o[r.charAt(u++)],s+=String.fromCharCode(255&(a<<3|e>>>2))+String.fromCharCode(255&(e<<6|h<<1|A>>>4))+String.fromCharCode(255&(A<<4|d>>>1))):7===m&&(a=o[r.charAt(u++)],e=o[r.charAt(u++)],h=o[r.charAt(u++)],A=o[r.charAt(u++)],d=o[r.charAt(u++)],C=o[r.charAt(u++)],i=o[r.charAt(u++)],s+=String.fromCharCode(255&(a<<3|e>>>2))+String.fromCharCode(255&(e<<6|h<<1|A>>>4))+String.fromCharCode(255&(A<<4|d>>>1))+String.fromCharCode(255&(d<<7|C<<2|i>>>3))),s},d={encode:function(r,t){var a="string"!=typeof r;return a&&r.constructor===ArrayBuffer&&(r=new Uint8Array(r)),a?function(r){for(var t,a,o,h,c,n="",A=r.length,d=0,C=5*parseInt(A/5);d<C;)t=r[d++],a=r[d++],o=r[d++],h=r[d++],c=r[d++],n+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[31&(o<<1|h>>>7)]+e[h>>>2&31]+e[31&(h<<3|c>>>5)]+e[31&c];var i=A-C;return 1===i?(t=r[d],n+=e[t>>>3]+e[t<<2&31]+"======"):2===i?(t=r[d++],a=r[d],n+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[a<<4&31]+"===="):3===i?(t=r[d++],a=r[d++],o=r[d],n+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[o<<1&31]+"==="):4===i&&(t=r[d++],a=r[d++],o=r[d++],h=r[d],n+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[31&(o<<1|h>>>7)]+e[h>>>2&31]+e[h<<3&31]+"="),n}(r):t?function(r){for(var t,a,o,h,c,n="",A=r.length,d=0,C=5*parseInt(A/5);d<C;)t=r.charCodeAt(d++),a=r.charCodeAt(d++),o=r.charCodeAt(d++),h=r.charCodeAt(d++),c=r.charCodeAt(d++),n+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[31&(o<<1|h>>>7)]+e[h>>>2&31]+e[31&(h<<3|c>>>5)]+e[31&c];var i=A-C;return 1===i?(t=r.charCodeAt(d),n+=e[t>>>3]+e[t<<2&31]+"======"):2===i?(t=r.charCodeAt(d++),a=r.charCodeAt(d),n+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[a<<4&31]+"===="):3===i?(t=r.charCodeAt(d++),a=r.charCodeAt(d++),o=r.charCodeAt(d),n+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[o<<1&31]+"==="):4===i&&(t=r.charCodeAt(d++),a=r.charCodeAt(d++),o=r.charCodeAt(d++),h=r.charCodeAt(d),n+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[31&(o<<1|h>>>7)]+e[h>>>2&31]+e[h<<3&31]+"="),n}(r):function(r){var t,a,o,c,n,A,d,C=!1,i="",f=0,s=0,g=r.length;do{for(h[0]=h[5],h[1]=h[6],h[2]=h[7],d=s;f<g&&d<5;++f)(A=r.charCodeAt(f))<128?h[d++]=A:A<2048?(h[d++]=192|A>>6,h[d++]=128|63&A):A<55296||A>=57344?(h[d++]=224|A>>12,h[d++]=128|A>>6&63,h[d++]=128|63&A):(A=65536+((1023&A)<<10|1023&r.charCodeAt(++f)),h[d++]=240|A>>18,h[d++]=128|A>>12&63,h[d++]=128|A>>6&63,h[d++]=128|63&A);s=d-5,f===g&&++f,f>g&&d<6&&(C=!0),t=h[0],d>4?(a=h[1],o=h[2],c=h[3],n=h[4],i+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[31&(o<<1|c>>>7)]+e[c>>>2&31]+e[31&(c<<3|n>>>5)]+e[31&n]):1===d?i+=e[t>>>3]+e[t<<2&31]+"======":2===d?(a=h[1],i+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[a<<4&31]+"===="):3===d?(a=h[1],o=h[2],i+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[o<<1&31]+"==="):(a=h[1],o=h[2],c=h[3],i+=e[t>>>3]+e[31&(t<<2|a>>>6)]+e[a>>>1&31]+e[31&(a<<4|o>>>4)]+e[31&(o<<1|c>>>7)]+e[c>>>2&31]+e[c<<3&31]+"=")}while(!C);return i}(r)},decode:A};A.asBytes=n,t?module.exports=d:(r.base32=d,a&&define(function(){return d}))}();/*
 * [hi-base64]{@link https://github.com/emn178/hi-base64}
 *
 * @version 0.2.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";var r="object"==typeof window?window:{},t=!r.HI_BASE64_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;t&&(r=global);var e,o,n=!r.HI_BASE64_NO_COMMON_JS&&"object"==typeof module&&module.exports,a="function"==typeof define&&define.amd,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),h={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63,"-":62,_:63},f=function(r){for(var t=[],e=0;e<r.length;e++){var o=r.charCodeAt(e);128>o?t[t.length]=o:2048>o?(t[t.length]=192|o>>6,t[t.length]=128|63&o):55296>o||o>=57344?(t[t.length]=224|o>>12,t[t.length]=128|o>>6&63,t[t.length]=128|63&o):(o=65536+((1023&o)<<10|1023&r.charCodeAt(++e)),t[t.length]=240|o>>18,t[t.length]=128|o>>12&63,t[t.length]=128|o>>6&63,t[t.length]=128|63&o)}return t},c=function(r){var t,e,o,n,a=[],i=0,f=r.length;"="===r.charAt(f-2)?f-=2:"="===r.charAt(f-1)&&(f-=1);for(var c=0,C=f>>2<<2;C>c;)t=h[r.charAt(c++)],e=h[r.charAt(c++)],o=h[r.charAt(c++)],n=h[r.charAt(c++)],a[i++]=255&(t<<2|e>>>4),a[i++]=255&(e<<4|o>>>2),a[i++]=255&(o<<6|n);var g=f-C;return 2===g?(t=h[r.charAt(c++)],e=h[r.charAt(c++)],a[i++]=255&(t<<2|e>>>4)):3===g&&(t=h[r.charAt(c++)],e=h[r.charAt(c++)],o=h[r.charAt(c++)],a[i++]=255&(t<<2|e>>>4),a[i++]=255&(e<<4|o>>>2)),a},C=function(r){for(var t,e,o,n="",a=r.length,h=0,f=3*parseInt(a/3);f>h;)t=r[h++],e=r[h++],o=r[h++],n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[63&(e<<2|o>>>6)]+i[63&o];var c=a-f;return 1===c?(t=r[h],n+=i[t>>>2]+i[t<<4&63]+"=="):2===c&&(t=r[h++],e=r[h],n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[e<<2&63]+"="),n},g=r.btoa,d=r.atob;if(t){var s=require("buffer").Buffer;g=function(r){return new s(r,"ascii").toString("base64")},e=function(r){return new s(r).toString("base64")},C=e,d=function(r){return new s(r,"base64").toString("ascii")},o=function(r){return new s(r,"base64").toString()}}else g?(e=function(r){for(var t="",e=0;e<r.length;e++){var o=r.charCodeAt(e);128>o?t+=String.fromCharCode(o):2048>o?t+=String.fromCharCode(192|o>>6)+String.fromCharCode(128|63&o):55296>o||o>=57344?t+=String.fromCharCode(224|o>>12)+String.fromCharCode(128|o>>6&63)+String.fromCharCode(128|63&o):(o=65536+((1023&o)<<10|1023&r.charCodeAt(++e)),t+=String.fromCharCode(240|o>>18)+String.fromCharCode(128|o>>12&63)+String.fromCharCode(128|o>>6&63)+String.fromCharCode(128|63&o))}return g(t)},o=function(r){var t=d(r.trim("=").replace(/-/g,"+").replace(/_/g,"/"));if(!/[^\x00-\x7F]/.test(t))return t;for(var e,o,n="",a=0,i=t.length,h=0;i>a;)if(e=t.charCodeAt(a++),127>=e)n+=String.fromCharCode(e);else{if(e>191&&223>=e)o=31&e,h=1;else if(239>=e)o=15&e,h=2;else{if(!(247>=e))throw"not a UTF-8 string";o=7&e,h=3}for(var f=0;h>f;++f){if(e=t.charCodeAt(a++),128>e||e>191)throw"not a UTF-8 string";o<<=6,o+=63&e}if(o>=55296&&57343>=o)throw"not a UTF-8 string";if(o>1114111)throw"not a UTF-8 string";65535>=o?n+=String.fromCharCode(o):(o-=65536,n+=String.fromCharCode((o>>10)+55296),n+=String.fromCharCode((1023&o)+56320))}return n}):(g=function(r){for(var t,e,o,n="",a=r.length,h=0,f=3*parseInt(a/3);f>h;)t=r.charCodeAt(h++),e=r.charCodeAt(h++),o=r.charCodeAt(h++),n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[63&(e<<2|o>>>6)]+i[63&o];var c=a-f;return 1===c?(t=r.charCodeAt(h),n+=i[t>>>2]+i[t<<4&63]+"=="):2===c&&(t=r.charCodeAt(h++),e=r.charCodeAt(h),n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[e<<2&63]+"="),n},e=function(r){for(var t,e,o,n="",a=f(r),h=a.length,c=0,C=3*parseInt(h/3);C>c;)t=a[c++],e=a[c++],o=a[c++],n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[63&(e<<2|o>>>6)]+i[63&o];var g=h-C;return 1===g?(t=a[c],n+=i[t>>>2]+i[t<<4&63]+"=="):2===g&&(t=a[c++],e=a[c],n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[e<<2&63]+"="),n},d=function(r){var t,e,o,n,a="",i=r.length;"="===r.charAt(i-2)?i-=2:"="===r.charAt(i-1)&&(i-=1);for(var f=0,c=i>>2<<2;c>f;)t=h[r.charAt(f++)],e=h[r.charAt(f++)],o=h[r.charAt(f++)],n=h[r.charAt(f++)],a+=String.fromCharCode(255&(t<<2|e>>>4))+String.fromCharCode(255&(e<<4|o>>>2))+String.fromCharCode(255&(o<<6|n));var C=i-c;return 2===C?(t=h[r.charAt(f++)],e=h[r.charAt(f++)],a+=String.fromCharCode(255&(t<<2|e>>>4))):3===C&&(t=h[r.charAt(f++)],e=h[r.charAt(f++)],o=h[r.charAt(f++)],a+=String.fromCharCode(255&(t<<2|e>>>4))+String.fromCharCode(255&(e<<4|o>>>2))),a},o=function(r){for(var t,e,o="",n=c(r),a=n.length,i=0,h=0;a>i;)if(t=n[i++],127>=t)o+=String.fromCharCode(t);else{if(t>191&&223>=t)e=31&t,h=1;else if(239>=t)e=15&t,h=2;else{if(!(247>=t))throw"not a UTF-8 string";e=7&t,h=3}for(var f=0;h>f;++f){if(t=n[i++],128>t||t>191)throw"not a UTF-8 string";e<<=6,e+=63&t}if(e>=55296&&57343>=e)throw"not a UTF-8 string";if(e>1114111)throw"not a UTF-8 string";65535>=e?o+=String.fromCharCode(e):(e-=65536,o+=String.fromCharCode((e>>10)+55296),o+=String.fromCharCode((1023&e)+56320))}return o});var u=function(t,o){var n="string"!=typeof t;return n&&t.constructor===r.ArrayBuffer&&(t=new Uint8Array(t)),n?C(t):!o&&/[^\x00-\x7F]/.test(t)?e(t):g(t)},A=function(r,t){return t?d(r):o(r)},l={encode:u,decode:A,atob:d,btoa:g};A.bytes=c,A.string=A,n?module.exports=l:(r.base64=l,a&&define(function(){return l}))}();/**
 * [js-crc]{@link https://github.com/emn178/js-crc}
 *
 * @namespace crc
 * @version 0.2.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2017
 * @license MIT
 */
!function(){"use strict";var e="object"==typeof window?window:{},o=!e.JS_CRC_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;o&&(e=global);var n,t,r,f,a=!e.JS_CRC_NO_COMMON_JS&&"object"==typeof module&&module.exports,i="function"==typeof define&&define.amd,l=!e.JS_CRC_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,s="0123456789abcdef".split(""),c=[{name:"crc32",polynom:3988292384,initValue:-1,bytes:4},{name:"crc16",polynom:40961,initValue:0,bytes:2}];for(n=0;n<c.length;++n){var u=c[n];for(u.method=function(e){return function(o){return d(o,e)}}(u),u.table=[],t=0;256>t;++t){for(f=t,r=0;8>r;++r)f=1&f?u.polynom^f>>>1:f>>>1;u.table[t]=f>>>0}}var d=function(e,o){var n="string"!=typeof e;n&&l&&e instanceof ArrayBuffer&&(e=new Uint8Array(e));var t,r,f=o.initValue,a=e.length,i=o.table;if(n)for(r=0;a>r;++r)f=i[255&(f^e[r])]^f>>>8;else for(r=0;a>r;++r)t=e.charCodeAt(r),128>t?f=i[255&(f^t)]^f>>>8:2048>t?(f=i[255&(f^(192|t>>6))]^f>>>8,f=i[255&(f^(128|63&t))]^f>>>8):55296>t||t>=57344?(f=i[255&(f^(224|t>>12))]^f>>>8,f=i[255&(f^(128|t>>6&63))]^f>>>8,f=i[255&(f^(128|63&t))]^f>>>8):(t=65536+((1023&t)<<10|1023&e.charCodeAt(++r)),f=i[255&(f^(240|t>>18))]^f>>>8,f=i[255&(f^(128|t>>12&63))]^f>>>8,f=i[255&(f^(128|t>>6&63))]^f>>>8,f=i[255&(f^(128|63&t))]^f>>>8);f^=o.initValue;var c="";return o.bytes>2&&(c+=s[f>>28&15]+s[f>>24&15]+s[f>>20&15]+s[f>>16&15]),c+=s[f>>12&15]+s[f>>8&15]+s[f>>4&15]+s[15&f]},p={};for(n=0;n<c.length;++n){var u=c[n];p[u.name]=u.method}if(a)module.exports=p;else{for(n=0;n<c.length;++n){var u=c[n];e[u.name]=u.method}i&&define(function(){return p})}}();/**
 * [js-htmlencode]{@link https://github.com/emn178/js-htmlencode}
 *
 * @version 0.3.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";var e="object"==typeof window?window:{},r=!e.JS_HTMLENCODE_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;r&&(e=global);var a=!e.JS_HTMLENCODE_NO_COMMON_JS&&"object"==typeof module&&module.exports,i="function"==typeof define&&define.amd,t={"&nbsp;":" ","&iexcl;":"¡","&cent;":"¢","&pound;":"£","&curren;":"¤","&yen;":"¥","&brvbar;":"¦","&sect;":"§","&uml;":"¨","&copy;":"©","&ordf;":"ª","&laquo;":"«","&not;":"¬","&shy;":"­","&reg;":"®","&macr;":"¯","&deg;":"°","&plusmn;":"±","&sup2;":"²","&sup3;":"³","&acute;":"´","&micro;":"µ","&para;":"¶","&middot;":"·","&cedil;":"¸","&sup1;":"¹","&ordm;":"º","&raquo;":"»","&frac14;":"¼","&frac12;":"½","&frac34;":"¾","&iquest;":"¿","&Agrave;":"À","&Aacute;":"Á","&Acirc;":"Â","&Atilde;":"Ã","&Auml;":"Ä","&Aring;":"Å","&AElig;":"Æ","&Ccedil;":"Ç","&Egrave;":"È","&Eacute;":"É","&Ecirc;":"Ê","&Euml;":"Ë","&Igrave;":"Ì","&Iacute;":"Í","&Icirc;":"Î","&Iuml;":"Ï","&ETH;":"Ð","&Ntilde;":"Ñ","&Ograve;":"Ò","&Oacute;":"Ó","&Ocirc;":"Ô","&Otilde;":"Õ","&Ouml;":"Ö","&times;":"×","&Oslash;":"Ø","&Ugrave;":"Ù","&Uacute;":"Ú","&Ucirc;":"Û","&Uuml;":"Ü","&Yacute;":"Ý","&THORN;":"Þ","&szlig;":"ß","&agrave;":"à","&aacute;":"á","&acirc;":"â","&atilde;":"ã","&auml;":"ä","&aring;":"å","&aelig;":"æ","&ccedil;":"ç","&egrave;":"è","&eacute;":"é","&ecirc;":"ê","&euml;":"ë","&igrave;":"ì","&iacute;":"í","&icirc;":"î","&iuml;":"ï","&eth;":"ð","&ntilde;":"ñ","&ograve;":"ò","&oacute;":"ó","&ocirc;":"ô","&otilde;":"õ","&ouml;":"ö","&divide;":"÷","&oslash;":"ø","&ugrave;":"ù","&uacute;":"ú","&ucirc;":"û","&uuml;":"ü","&yacute;":"ý","&thorn;":"þ","&yuml;":"ÿ","&quot;":'"',"&amp;":"&","&lt;":"<","&gt;":">","&apos;":"'","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},o=function(e){if("#"!==e.charAt(1))return t[e]||e;var r,a=e.charAt(2);return"x"===a||"X"===a?(a=e.substring(3,e.length-1),r=parseInt(a,16)):(a=e.substring(2,e.length-1),r=parseInt(a)),isNaN(r)?e:String.fromCharCode(r)},l=function(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},u=function(e){return e.replace(/&#?\w+;/g,o)},c=l;l.htmlEncode=l,l.htmlDecode=u,a?module.exports=c:(e.htmlEncode=l,e.htmlDecode=u,i&&define(function(){return c}))}();/**
 * [js-md2]{@link https://github.com/emn178/js-md2}
 *
 * @namespace md2
 * @version 0.2.2
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";var o="object"==typeof window?window:{},e=!o.JS_MD2_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;e&&(o=global);var r=!o.JS_MD2_NO_COMMON_JS&&"object"==typeof module&&module.exports,f="function"==typeof define&&define.amd,t="0123456789abcdef".split(""),n=[41,46,67,201,162,216,124,1,61,54,84,161,236,240,6,19,98,167,5,243,192,199,115,140,152,147,43,217,188,76,130,202,30,155,87,60,253,212,224,22,103,66,111,24,138,23,229,18,190,78,196,214,218,158,222,73,160,251,245,142,187,47,238,122,169,104,121,145,21,178,7,63,148,194,16,137,11,34,95,33,128,127,93,154,90,144,50,39,53,62,204,231,191,247,151,3,255,25,48,179,72,165,181,209,215,94,146,42,172,86,170,198,79,184,56,210,150,164,125,182,118,252,107,226,156,116,4,241,69,157,112,89,100,113,135,32,134,91,207,101,230,45,168,2,27,96,37,173,174,176,185,246,28,70,97,105,52,64,126,15,85,71,163,35,221,81,175,58,195,92,249,206,186,197,234,38,44,83,13,110,133,40,132,9,211,223,205,244,65,129,77,82,106,220,55,200,108,193,171,250,36,225,123,8,12,189,177,74,120,136,149,139,227,99,232,109,233,203,213,254,59,0,29,57,242,239,183,14,102,88,208,228,166,119,114,248,235,117,75,10,49,68,80,180,143,237,31,26,219,153,141,51,159,17,131,20],d=[],i=[],s=[],c=function(o){var e,r,f,c,p,u,a=0,l=1,_=0,v=0,b=0,m=o.length;for(r=0;16>r;++r)i[r]=s[r]=0;d[16]=d[17]=d[18]=0;do{for(d[0]=d[16],d[1]=d[17],d[2]=d[18],d[16]=d[17]=d[18]=d[3]=d[4]=d[5]=d[6]=d[7]=d[8]=d[9]=d[10]=d[11]=d[12]=d[13]=d[14]=d[15]=0,r=v;m>_&&16>r;++_)e=o.charCodeAt(_),128>e?d[r++]=e:2048>e?(d[r++]=192|e>>6,d[r++]=128|63&e):55296>e||e>=57344?(d[r++]=224|e>>12,d[r++]=128|e>>6&63,d[r++]=128|63&e):(e=65536+((1023&e)<<10|1023&o.charCodeAt(++_)),d[r++]=240|e>>18,d[r++]=128|e>>12&63,d[r++]=128|e>>6&63,d[r++]=128|63&e);if(b+=r-v,v=r-16,_===m&&16>r)for(l=2,p=16-(15&b);16>r;++r)d[r]=p;for(r=0;16>r;++r)s[r]^=n[d[r]^a],a=s[r];for(r=0;l>r;++r)for(u=0===r?d:s,i[16]=u[0],i[32]=i[16]^i[0],i[17]=u[1],i[33]=i[17]^i[1],i[18]=u[2],i[34]=i[18]^i[2],i[19]=u[3],i[35]=i[19]^i[3],i[20]=u[4],i[36]=i[20]^i[4],i[21]=u[5],i[37]=i[21]^i[5],i[22]=u[6],i[38]=i[22]^i[6],i[23]=u[7],i[39]=i[23]^i[7],i[24]=u[8],i[40]=i[24]^i[8],i[25]=u[9],i[41]=i[25]^i[9],i[26]=u[10],i[42]=i[26]^i[10],i[27]=u[11],i[43]=i[27]^i[11],i[28]=u[12],i[44]=i[28]^i[12],i[29]=u[13],i[45]=i[29]^i[13],i[30]=u[14],i[46]=i[30]^i[14],i[31]=u[15],i[47]=i[31]^i[15],p=0,f=0;18>f;++f){for(c=0;48>c;++c)i[c]=p=i[c]^n[p];p=p+f&255}}while(1===l);var w="";for(r=0;16>r;++r)w+=t[i[r]>>4&15]+t[15&i[r]];return w};r?module.exports=c:(o.md2=c,f&&define(function(){return c}))}();/**
 * [js-md4]{@link https://github.com/emn178/js-md4}
 *
 * @namespace md4
 * @version 0.3.2
 * @author Yi-Cyuan Chen [emn178@gmail.com]
 * @copyright Yi-Cyuan Chen 2015-2027
 * @license MIT
 */
!function(){"use strict";function t(t){if(t)p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p,this.buffer8=r;else if(n){var e=new ArrayBuffer(68);this.buffer8=new Uint8Array(e),this.blocks=new Uint32Array(e)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=0,this.finalized=this.hashed=!1,this.first=!0}var e="object"==typeof window?window:{},i=!e.JS_MD4_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;i&&(e=global);var r,h=!e.JS_MD4_NO_COMMON_JS&&"object"==typeof module&&module.exports,s="function"==typeof define&&define.amd,n=!e.JS_MD4_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),a=[128,32768,8388608,-2147483648],o=[0,8,16,24],u=["hex","array","digest","buffer","arrayBuffer"],p=[];if(n){var d=new ArrayBuffer(68);r=new Uint8Array(d),p=new Uint32Array(d)}var y=function(e){return function(i){return new t(!0).update(i)[e]()}},c=function(){var e=y("hex");i&&(e=l(e)),e.create=function(){return new t},e.update=function(t){return e.create().update(t)};for(var r=0;r<u.length;++r){var h=u[r];e[h]=y(h)}return e},l=function(t){var e=require("crypto"),i=require("buffer").Buffer,r=function(r){if("string"==typeof r)return e.createHash("md4").update(r,"utf8").digest("hex");if(n&&r instanceof ArrayBuffer)r=new Uint8Array(r);else if(void 0===r.length)return t(r);return e.createHash("md4").update(new i(r)).digest("hex")};return r};t.prototype.update=function(t){if(!this.finalized){var e="string"!=typeof t;e&&n&&t instanceof ArrayBuffer&&(t=new Uint8Array(t));for(var i,r,h=0,s=t.length||0,f=this.blocks,a=this.buffer8;s>h;){if(this.hashed&&(this.hashed=!1,f[0]=f[16],f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0),e)if(n)for(r=this.start;s>h&&64>r;++h)a[r++]=t[h];else for(r=this.start;s>h&&64>r;++h)f[r>>2]|=t[h]<<o[3&r++];else if(n)for(r=this.start;s>h&&64>r;++h)i=t.charCodeAt(h),128>i?a[r++]=i:2048>i?(a[r++]=192|i>>6,a[r++]=128|63&i):55296>i||i>=57344?(a[r++]=224|i>>12,a[r++]=128|i>>6&63,a[r++]=128|63&i):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++h)),a[r++]=240|i>>18,a[r++]=128|i>>12&63,a[r++]=128|i>>6&63,a[r++]=128|63&i);else for(r=this.start;s>h&&64>r;++h)i=t.charCodeAt(h),128>i?f[r>>2]|=i<<o[3&r++]:2048>i?(f[r>>2]|=(192|i>>6)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]):55296>i||i>=57344?(f[r>>2]|=(224|i>>12)<<o[3&r++],f[r>>2]|=(128|i>>6&63)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++h)),f[r>>2]|=(240|i>>18)<<o[3&r++],f[r>>2]|=(128|i>>12&63)<<o[3&r++],f[r>>2]|=(128|i>>6&63)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]);this.lastByteIndex=r,this.bytes+=r-this.start,r>=64?(this.start=r-64,this.hash(),this.hashed=!0):this.start=r}return this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[e>>2]|=a[3&e],e>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,e,i,r,h,s,n,f,a=this.blocks;this.first?(t=a[0]-1,t=t<<3|t>>>29,r=(4023233417&t|2562383102&~t)+a[1]+271733878,r=r<<7|r>>>25,i=(r&t|4023233417&~r)+a[2]-1732584194,i=i<<11|i>>>21,e=(i&r|~i&t)+a[3]-271733879,e=e<<19|e>>>13):(t=this.h0,e=this.h1,i=this.h2,r=this.h3,t+=(e&i|~e&r)+a[0],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[1],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[2],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[3],e=e<<19|e>>>13),t+=(e&i|~e&r)+a[4],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[5],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[6],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[7],e=e<<19|e>>>13,t+=(e&i|~e&r)+a[8],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[9],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[10],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[11],e=e<<19|e>>>13,t+=(e&i|~e&r)+a[12],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[13],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[14],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[15],e=e<<19|e>>>13,s=e&i,t+=(s|e&r|i&r)+a[0]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[4]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[8]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[12]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[1]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[5]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[9]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[13]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[2]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[6]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[10]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[14]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[3]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[7]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[11]+1518500249,i=i<<9|i>>>23,e+=(i&r|i&t|f)+a[15]+1518500249,e=e<<13|e>>>19,s=e^i,t+=(s^r)+a[0]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[8]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[4]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[12]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[2]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[10]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[6]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[14]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[1]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[9]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[5]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[13]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[3]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[11]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[7]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[15]+1859775393,e=e<<15|e>>>17,this.first?(this.h0=t+1732584193<<0,this.h1=e-271733879<<0,this.h2=i-1732584194<<0,this.h3=r+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+e<<0,this.h2=this.h2+i<<0,this.h3=this.h3+r<<0)},t.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,i=this.h2,r=this.h3;return f[t>>4&15]+f[15&t]+f[t>>12&15]+f[t>>8&15]+f[t>>20&15]+f[t>>16&15]+f[t>>28&15]+f[t>>24&15]+f[e>>4&15]+f[15&e]+f[e>>12&15]+f[e>>8&15]+f[e>>20&15]+f[e>>16&15]+f[e>>28&15]+f[e>>24&15]+f[i>>4&15]+f[15&i]+f[i>>12&15]+f[i>>8&15]+f[i>>20&15]+f[i>>16&15]+f[i>>28&15]+f[i>>24&15]+f[r>>4&15]+f[15&r]+f[r>>12&15]+f[r>>8&15]+f[r>>20&15]+f[r>>16&15]+f[r>>28&15]+f[r>>24&15]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,i=this.h2,r=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),e=new Uint32Array(t);return e[0]=this.h0,e[1]=this.h1,e[2]=this.h2,e[3]=this.h3,t},t.prototype.buffer=t.prototype.arrayBuffer;var b=c();h?module.exports=b:(e.md4=b,s&&define(function(){return b}))}();/**
 * [js-md4]{@link https://github.com/emn178/js-md4}
 *
 * @namespace md4
 * @version 0.3.2
 * @author Yi-Cyuan Chen [emn178@gmail.com]
 * @copyright Yi-Cyuan Chen 2015-2027
 * @license MIT
 */
!function(){"use strict";function t(t){if(t)p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p,this.buffer8=r;else if(n){var e=new ArrayBuffer(68);this.buffer8=new Uint8Array(e),this.blocks=new Uint32Array(e)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=0,this.finalized=this.hashed=!1,this.first=!0}var e="object"==typeof window?window:{},i=!e.JS_MD4_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;i&&(e=global);var r,h=!e.JS_MD4_NO_COMMON_JS&&"object"==typeof module&&module.exports,s="function"==typeof define&&define.amd,n=!e.JS_MD4_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),a=[128,32768,8388608,-2147483648],o=[0,8,16,24],u=["hex","array","digest","buffer","arrayBuffer"],p=[];if(n){var d=new ArrayBuffer(68);r=new Uint8Array(d),p=new Uint32Array(d)}var y=function(e){return function(i){return new t(!0).update(i)[e]()}},c=function(){var e=y("hex");i&&(e=l(e)),e.create=function(){return new t},e.update=function(t){return e.create().update(t)};for(var r=0;r<u.length;++r){var h=u[r];e[h]=y(h)}return e},l=function(t){var e=require("crypto"),i=require("buffer").Buffer,r=function(r){if("string"==typeof r)return e.createHash("md4").update(r,"utf8").digest("hex");if(n&&r instanceof ArrayBuffer)r=new Uint8Array(r);else if(void 0===r.length)return t(r);return e.createHash("md4").update(new i(r)).digest("hex")};return r};t.prototype.update=function(t){if(!this.finalized){var e="string"!=typeof t;e&&n&&t instanceof ArrayBuffer&&(t=new Uint8Array(t));for(var i,r,h=0,s=t.length||0,f=this.blocks,a=this.buffer8;s>h;){if(this.hashed&&(this.hashed=!1,f[0]=f[16],f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0),e)if(n)for(r=this.start;s>h&&64>r;++h)a[r++]=t[h];else for(r=this.start;s>h&&64>r;++h)f[r>>2]|=t[h]<<o[3&r++];else if(n)for(r=this.start;s>h&&64>r;++h)i=t.charCodeAt(h),128>i?a[r++]=i:2048>i?(a[r++]=192|i>>6,a[r++]=128|63&i):55296>i||i>=57344?(a[r++]=224|i>>12,a[r++]=128|i>>6&63,a[r++]=128|63&i):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++h)),a[r++]=240|i>>18,a[r++]=128|i>>12&63,a[r++]=128|i>>6&63,a[r++]=128|63&i);else for(r=this.start;s>h&&64>r;++h)i=t.charCodeAt(h),128>i?f[r>>2]|=i<<o[3&r++]:2048>i?(f[r>>2]|=(192|i>>6)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]):55296>i||i>=57344?(f[r>>2]|=(224|i>>12)<<o[3&r++],f[r>>2]|=(128|i>>6&63)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++h)),f[r>>2]|=(240|i>>18)<<o[3&r++],f[r>>2]|=(128|i>>12&63)<<o[3&r++],f[r>>2]|=(128|i>>6&63)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]);this.lastByteIndex=r,this.bytes+=r-this.start,r>=64?(this.start=r-64,this.hash(),this.hashed=!0):this.start=r}return this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[e>>2]|=a[3&e],e>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,e,i,r,h,s,n,f,a=this.blocks;this.first?(t=a[0]-1,t=t<<3|t>>>29,r=(4023233417&t|2562383102&~t)+a[1]+271733878,r=r<<7|r>>>25,i=(r&t|4023233417&~r)+a[2]-1732584194,i=i<<11|i>>>21,e=(i&r|~i&t)+a[3]-271733879,e=e<<19|e>>>13):(t=this.h0,e=this.h1,i=this.h2,r=this.h3,t+=(e&i|~e&r)+a[0],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[1],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[2],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[3],e=e<<19|e>>>13),t+=(e&i|~e&r)+a[4],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[5],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[6],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[7],e=e<<19|e>>>13,t+=(e&i|~e&r)+a[8],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[9],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[10],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[11],e=e<<19|e>>>13,t+=(e&i|~e&r)+a[12],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[13],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[14],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[15],e=e<<19|e>>>13,s=e&i,t+=(s|e&r|i&r)+a[0]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[4]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[8]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[12]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[1]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[5]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[9]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[13]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[2]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[6]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[10]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[14]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[3]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[7]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[11]+1518500249,i=i<<9|i>>>23,e+=(i&r|i&t|f)+a[15]+1518500249,e=e<<13|e>>>19,s=e^i,t+=(s^r)+a[0]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[8]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[4]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[12]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[2]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[10]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[6]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[14]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[1]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[9]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[5]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[13]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[3]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[11]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[7]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[15]+1859775393,e=e<<15|e>>>17,this.first?(this.h0=t+1732584193<<0,this.h1=e-271733879<<0,this.h2=i-1732584194<<0,this.h3=r+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+e<<0,this.h2=this.h2+i<<0,this.h3=this.h3+r<<0)},t.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,i=this.h2,r=this.h3;return f[t>>4&15]+f[15&t]+f[t>>12&15]+f[t>>8&15]+f[t>>20&15]+f[t>>16&15]+f[t>>28&15]+f[t>>24&15]+f[e>>4&15]+f[15&e]+f[e>>12&15]+f[e>>8&15]+f[e>>20&15]+f[e>>16&15]+f[e>>28&15]+f[e>>24&15]+f[i>>4&15]+f[15&i]+f[i>>12&15]+f[i>>8&15]+f[i>>20&15]+f[i>>16&15]+f[i>>28&15]+f[i>>24&15]+f[r>>4&15]+f[15&r]+f[r>>12&15]+f[r>>8&15]+f[r>>20&15]+f[r>>16&15]+f[r>>28&15]+f[r>>24&15]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,i=this.h2,r=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),e=new Uint32Array(t);return e[0]=this.h0,e[1]=this.h1,e[2]=this.h2,e[3]=this.h3,t},t.prototype.buffer=t.prototype.arrayBuffer;var b=c();h?module.exports=b:(e.md4=b,s&&define(function(){return b}))}();/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";function t(t){t?(f[0]=f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0,this.blocks=f):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var h="object"==typeof window?window:{},s=!h.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;s&&(h=global);var i=!h.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,e="function"==typeof define&&define.amd,r="0123456789abcdef".split(""),o=[-2147483648,8388608,32768,128],n=[24,16,8,0],a=["hex","array","digest","arrayBuffer"],f=[],u=function(h){return function(s){return new t(!0).update(s)[h]()}},c=function(){var h=u("hex");s&&(h=p(h)),h.create=function(){return new t},h.update=function(t){return h.create().update(t)};for(var i=0;i<a.length;++i){var e=a[i];h[e]=u(e)}return h},p=function(t){var h=eval("require('crypto')"),s=eval("require('buffer').Buffer"),i=function(i){if("string"==typeof i)return h.createHash("sha1").update(i,"utf8").digest("hex");if(i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(void 0===i.length)return t(i);return h.createHash("sha1").update(new s(i)).digest("hex")};return i};t.prototype.update=function(t){if(!this.finalized){var s="string"!=typeof t;s&&t.constructor===h.ArrayBuffer&&(t=new Uint8Array(t));for(var i,e,r=0,o=t.length||0,a=this.blocks;r<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),s)for(e=this.start;r<o&&e<64;++r)a[e>>2]|=t[r]<<n[3&e++];else for(e=this.start;r<o&&e<64;++r)(i=t.charCodeAt(r))<128?a[e>>2]|=i<<n[3&e++]:i<2048?(a[e>>2]|=(192|i>>6)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):i<55296||i>=57344?(a[e>>2]|=(224|i>>12)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++r)),a[e>>2]|=(240|i>>18)<<n[3&e++],a[e>>2]|=(128|i>>12&63)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=o[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,h,s=this.h0,i=this.h1,e=this.h2,r=this.h3,o=this.h4,n=this.blocks;for(t=16;t<80;++t)h=n[t-3]^n[t-8]^n[t-14]^n[t-16],n[t]=h<<1|h>>>31;for(t=0;t<20;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|~i&r)+o+1518500249+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|~s&e)+r+1518500249+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|~o&i)+e+1518500249+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|~r&s)+i+1518500249+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|~e&o)+s+1518500249+n[t+4]<<0,e=e<<30|e>>>2;for(;t<40;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o+1859775393+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r+1859775393+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e+1859775393+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i+1859775393+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s+1859775393+n[t+4]<<0,e=e<<30|e>>>2;for(;t<60;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|i&r|e&r)+o-1894007588+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|s&e|i&e)+r-1894007588+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|o&i|s&i)+e-1894007588+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|r&s|o&s)+i-1894007588+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|e&o|r&o)+s-1894007588+n[t+4]<<0,e=e<<30|e>>>2;for(;t<80;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o-899497514+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r-899497514+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e-899497514+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i-899497514+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s-899497514+n[t+4]<<0,e=e<<30|e>>>2;this.h0=this.h0+s<<0,this.h1=this.h1+i<<0,this.h2=this.h2+e<<0,this.h3=this.h3+r<<0,this.h4=this.h4+o<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return r[t>>28&15]+r[t>>24&15]+r[t>>20&15]+r[t>>16&15]+r[t>>12&15]+r[t>>8&15]+r[t>>4&15]+r[15&t]+r[h>>28&15]+r[h>>24&15]+r[h>>20&15]+r[h>>16&15]+r[h>>12&15]+r[h>>8&15]+r[h>>4&15]+r[15&h]+r[s>>28&15]+r[s>>24&15]+r[s>>20&15]+r[s>>16&15]+r[s>>12&15]+r[s>>8&15]+r[s>>4&15]+r[15&s]+r[i>>28&15]+r[i>>24&15]+r[i>>20&15]+r[i>>16&15]+r[i>>12&15]+r[i>>8&15]+r[i>>4&15]+r[15&i]+r[e>>28&15]+r[e>>24&15]+r[e>>20&15]+r[e>>16&15]+r[e>>12&15]+r[e>>8&15]+r[e>>4&15]+r[15&e]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,i>>24&255,i>>16&255,i>>8&255,255&i,e>>24&255,e>>16&255,e>>8&255,255&e]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),t};var y=c();i?module.exports=y:(h.sha1=y,e&&define(function(){return y}))}();/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
!function(){"use strict";function t(t,e,r){this.blocks=[],this.s=[],this.padding=e,this.outputBits=r,this.reset=!0,this.finalized=!1,this.block=0,this.start=0,this.blockCount=1600-(t<<1)>>5,this.byteCount=this.blockCount<<2,this.outputBlocks=r>>5,this.extraBytes=(31&r)>>3;for(var n=0;n<50;++n)this.s[n]=0}function e(e,r,n){t.call(this,e,r,n)}var r="input is invalid type",n="object"==typeof window,i=n?window:{};i.JS_SHA3_NO_WINDOW&&(n=!1);var o=!n&&"object"==typeof self;!i.JS_SHA3_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node?i=global:o&&(i=self);var a=!i.JS_SHA3_NO_COMMON_JS&&"object"==typeof module&&module.exports,s="function"==typeof define&&define.amd,u=!i.JS_SHA3_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),c=[4,1024,262144,67108864],h=[0,8,16,24],p=[1,0,32898,0,32906,2147483648,2147516416,2147483648,32907,0,2147483649,0,2147516545,2147483648,32777,2147483648,138,0,136,0,2147516425,0,2147483658,0,2147516555,0,139,2147483648,32905,2147483648,32771,2147483648,32770,2147483648,128,2147483648,32778,0,2147483658,2147483648,2147516545,2147483648,32896,2147483648,2147483649,0,2147516424,2147483648],d=[224,256,384,512],l=[128,256],y=["hex","buffer","arrayBuffer","array","digest"],b={128:168,256:136};!i.JS_SHA3_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!u||!i.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});for(var A=function(e,r,n){return function(i){return new t(e,r,e).update(i)[n]()}},w=function(e,r,n){return function(i,o){return new t(e,r,o).update(i)[n]()}},v=function(t,e,r){return function(e,n,i,o){return S["cshake"+t].update(e,n,i,o)[r]()}},B=function(t,e,r){return function(e,n,i,o){return S["kmac"+t].update(e,n,i,o)[r]()}},g=function(t,e,r,n){for(var i=0;i<y.length;++i){var o=y[i];t[o]=e(r,n,o)}return t},_=function(e,r){var n=A(e,r,"hex");return n.create=function(){return new t(e,r,e)},n.update=function(t){return n.create().update(t)},g(n,A,e,r)},k=[{name:"keccak",padding:[1,256,65536,16777216],bits:d,createMethod:_},{name:"sha3",padding:[6,1536,393216,100663296],bits:d,createMethod:_},{name:"shake",padding:[31,7936,2031616,520093696],bits:l,createMethod:function(e,r){var n=w(e,r,"hex");return n.create=function(n){return new t(e,r,n)},n.update=function(t,e){return n.create(e).update(t)},g(n,w,e,r)}},{name:"cshake",padding:c,bits:l,createMethod:function(e,r){var n=b[e],i=v(e,0,"hex");return i.create=function(i,o,a){return o||a?new t(e,r,i).bytepad([o,a],n):S["shake"+e].create(i)},i.update=function(t,e,r,n){return i.create(e,r,n).update(t)},g(i,v,e,r)}},{name:"kmac",padding:c,bits:l,createMethod:function(t,r){var n=b[t],i=B(t,0,"hex");return i.create=function(i,o,a){return new e(t,r,o).bytepad(["KMAC",a],n).bytepad([i],n)},i.update=function(t,e,r,n){return i.create(t,r,n).update(e)},g(i,B,t,r)}}],S={},C=[],x=0;x<k.length;++x)for(var m=k[x],E=m.bits,O=0;O<E.length;++O){var z=m.name+"_"+E[O];if(C.push(z),S[z]=m.createMethod(E[O],m.padding),"sha3"!==m.name){var N=m.name+E[O];C.push(N),S[N]=S[z]}}t.prototype.update=function(t){if(this.finalized)throw new Error("finalize already called");var e,n=typeof t;if("string"!==n){if("object"!==n)throw new Error(r);if(null===t)throw new Error(r);if(u&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||u&&ArrayBuffer.isView(t)))throw new Error(r);e=!0}for(var i,o,a=this.blocks,s=this.byteCount,f=t.length,c=this.blockCount,p=0,d=this.s;p<f;){if(this.reset)for(this.reset=!1,a[0]=this.block,i=1;i<c+1;++i)a[i]=0;if(e)for(i=this.start;p<f&&i<s;++p)a[i>>2]|=t[p]<<h[3&i++];else for(i=this.start;p<f&&i<s;++p)(o=t.charCodeAt(p))<128?a[i>>2]|=o<<h[3&i++]:o<2048?(a[i>>2]|=(192|o>>6)<<h[3&i++],a[i>>2]|=(128|63&o)<<h[3&i++]):o<55296||o>=57344?(a[i>>2]|=(224|o>>12)<<h[3&i++],a[i>>2]|=(128|o>>6&63)<<h[3&i++],a[i>>2]|=(128|63&o)<<h[3&i++]):(o=65536+((1023&o)<<10|1023&t.charCodeAt(++p)),a[i>>2]|=(240|o>>18)<<h[3&i++],a[i>>2]|=(128|o>>12&63)<<h[3&i++],a[i>>2]|=(128|o>>6&63)<<h[3&i++],a[i>>2]|=(128|63&o)<<h[3&i++]);if(this.lastByteIndex=i,i>=s){for(this.start=i-s,this.block=a[c],i=0;i<c;++i)d[i]^=a[i];j(d),this.reset=!0}else this.start=i}return this},t.prototype.encode=function(t,e){var r=255&t,n=1,i=[r];for(r=255&(t>>=8);r>0;)i.unshift(r),r=255&(t>>=8),++n;return e?i.push(n):i.unshift(n),this.update(i),i.length},t.prototype.encodeString=function(t){var e,n=typeof t;if("string"!==n){if("object"!==n)throw new Error(r);if(null===t)throw new Error(r);if(u&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||u&&ArrayBuffer.isView(t)))throw new Error(r);e=!0}var i=0,o=t.length;if(e)i=o;else for(var a=0;a<t.length;++a){var s=t.charCodeAt(a);s<128?i+=1:s<2048?i+=2:s<55296||s>=57344?i+=3:(s=65536+((1023&s)<<10|1023&t.charCodeAt(++a)),i+=4)}return i+=this.encode(8*i),this.update(t),i},t.prototype.bytepad=function(t,e){for(var r=this.encode(e),n=0;n<t.length;++n)r+=this.encodeString(t[n]);var i=e-r%e,o=[];return o.length=i,this.update(o),this},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex,r=this.blockCount,n=this.s;if(t[e>>2]|=this.padding[3&e],this.lastByteIndex===this.byteCount)for(t[0]=t[r],e=1;e<r+1;++e)t[e]=0;for(t[r-1]|=2147483648,e=0;e<r;++e)n[e]^=t[e];j(n)}},t.prototype.toString=t.prototype.hex=function(){this.finalize();for(var t,e=this.blockCount,r=this.s,n=this.outputBlocks,i=this.extraBytes,o=0,a=0,s="";a<n;){for(o=0;o<e&&a<n;++o,++a)t=r[o],s+=f[t>>4&15]+f[15&t]+f[t>>12&15]+f[t>>8&15]+f[t>>20&15]+f[t>>16&15]+f[t>>28&15]+f[t>>24&15];a%e==0&&(j(r),o=0)}return i&&(t=r[o],s+=f[t>>4&15]+f[15&t],i>1&&(s+=f[t>>12&15]+f[t>>8&15]),i>2&&(s+=f[t>>20&15]+f[t>>16&15])),s},t.prototype.arrayBuffer=function(){this.finalize();var t,e=this.blockCount,r=this.s,n=this.outputBlocks,i=this.extraBytes,o=0,a=0,s=this.outputBits>>3;t=i?new ArrayBuffer(n+1<<2):new ArrayBuffer(s);for(var u=new Uint32Array(t);a<n;){for(o=0;o<e&&a<n;++o,++a)u[a]=r[o];a%e==0&&j(r)}return i&&(u[o]=r[o],t=t.slice(0,s)),t},t.prototype.buffer=t.prototype.arrayBuffer,t.prototype.digest=t.prototype.array=function(){this.finalize();for(var t,e,r=this.blockCount,n=this.s,i=this.outputBlocks,o=this.extraBytes,a=0,s=0,u=[];s<i;){for(a=0;a<r&&s<i;++a,++s)t=s<<2,e=n[a],u[t]=255&e,u[t+1]=e>>8&255,u[t+2]=e>>16&255,u[t+3]=e>>24&255;s%r==0&&j(n)}return o&&(t=s<<2,e=n[a],u[t]=255&e,o>1&&(u[t+1]=e>>8&255),o>2&&(u[t+2]=e>>16&255)),u},(e.prototype=new t).finalize=function(){return this.encode(this.outputBits,!0),t.prototype.finalize.call(this)};var j=function(t){var e,r,n,i,o,a,s,u,f,c,h,d,l,y,b,A,w,v,B,g,_,k,S,C,x,m,E,O,z,N,j,J,M,H,I,R,U,V,F,D,W,Y,K,q,G,L,P,Q,T,X,Z,$,tt,et,rt,nt,it,ot,at,st,ut,ft,ct;for(n=0;n<48;n+=2)i=t[0]^t[10]^t[20]^t[30]^t[40],o=t[1]^t[11]^t[21]^t[31]^t[41],a=t[2]^t[12]^t[22]^t[32]^t[42],s=t[3]^t[13]^t[23]^t[33]^t[43],u=t[4]^t[14]^t[24]^t[34]^t[44],f=t[5]^t[15]^t[25]^t[35]^t[45],c=t[6]^t[16]^t[26]^t[36]^t[46],h=t[7]^t[17]^t[27]^t[37]^t[47],e=(d=t[8]^t[18]^t[28]^t[38]^t[48])^(a<<1|s>>>31),r=(l=t[9]^t[19]^t[29]^t[39]^t[49])^(s<<1|a>>>31),t[0]^=e,t[1]^=r,t[10]^=e,t[11]^=r,t[20]^=e,t[21]^=r,t[30]^=e,t[31]^=r,t[40]^=e,t[41]^=r,e=i^(u<<1|f>>>31),r=o^(f<<1|u>>>31),t[2]^=e,t[3]^=r,t[12]^=e,t[13]^=r,t[22]^=e,t[23]^=r,t[32]^=e,t[33]^=r,t[42]^=e,t[43]^=r,e=a^(c<<1|h>>>31),r=s^(h<<1|c>>>31),t[4]^=e,t[5]^=r,t[14]^=e,t[15]^=r,t[24]^=e,t[25]^=r,t[34]^=e,t[35]^=r,t[44]^=e,t[45]^=r,e=u^(d<<1|l>>>31),r=f^(l<<1|d>>>31),t[6]^=e,t[7]^=r,t[16]^=e,t[17]^=r,t[26]^=e,t[27]^=r,t[36]^=e,t[37]^=r,t[46]^=e,t[47]^=r,e=c^(i<<1|o>>>31),r=h^(o<<1|i>>>31),t[8]^=e,t[9]^=r,t[18]^=e,t[19]^=r,t[28]^=e,t[29]^=r,t[38]^=e,t[39]^=r,t[48]^=e,t[49]^=r,y=t[0],b=t[1],L=t[11]<<4|t[10]>>>28,P=t[10]<<4|t[11]>>>28,O=t[20]<<3|t[21]>>>29,z=t[21]<<3|t[20]>>>29,st=t[31]<<9|t[30]>>>23,ut=t[30]<<9|t[31]>>>23,Y=t[40]<<18|t[41]>>>14,K=t[41]<<18|t[40]>>>14,H=t[2]<<1|t[3]>>>31,I=t[3]<<1|t[2]>>>31,A=t[13]<<12|t[12]>>>20,w=t[12]<<12|t[13]>>>20,Q=t[22]<<10|t[23]>>>22,T=t[23]<<10|t[22]>>>22,N=t[33]<<13|t[32]>>>19,j=t[32]<<13|t[33]>>>19,ft=t[42]<<2|t[43]>>>30,ct=t[43]<<2|t[42]>>>30,et=t[5]<<30|t[4]>>>2,rt=t[4]<<30|t[5]>>>2,R=t[14]<<6|t[15]>>>26,U=t[15]<<6|t[14]>>>26,v=t[25]<<11|t[24]>>>21,B=t[24]<<11|t[25]>>>21,X=t[34]<<15|t[35]>>>17,Z=t[35]<<15|t[34]>>>17,J=t[45]<<29|t[44]>>>3,M=t[44]<<29|t[45]>>>3,C=t[6]<<28|t[7]>>>4,x=t[7]<<28|t[6]>>>4,nt=t[17]<<23|t[16]>>>9,it=t[16]<<23|t[17]>>>9,V=t[26]<<25|t[27]>>>7,F=t[27]<<25|t[26]>>>7,g=t[36]<<21|t[37]>>>11,_=t[37]<<21|t[36]>>>11,$=t[47]<<24|t[46]>>>8,tt=t[46]<<24|t[47]>>>8,q=t[8]<<27|t[9]>>>5,G=t[9]<<27|t[8]>>>5,m=t[18]<<20|t[19]>>>12,E=t[19]<<20|t[18]>>>12,ot=t[29]<<7|t[28]>>>25,at=t[28]<<7|t[29]>>>25,D=t[38]<<8|t[39]>>>24,W=t[39]<<8|t[38]>>>24,k=t[48]<<14|t[49]>>>18,S=t[49]<<14|t[48]>>>18,t[0]=y^~A&v,t[1]=b^~w&B,t[10]=C^~m&O,t[11]=x^~E&z,t[20]=H^~R&V,t[21]=I^~U&F,t[30]=q^~L&Q,t[31]=G^~P&T,t[40]=et^~nt&ot,t[41]=rt^~it&at,t[2]=A^~v&g,t[3]=w^~B&_,t[12]=m^~O&N,t[13]=E^~z&j,t[22]=R^~V&D,t[23]=U^~F&W,t[32]=L^~Q&X,t[33]=P^~T&Z,t[42]=nt^~ot&st,t[43]=it^~at&ut,t[4]=v^~g&k,t[5]=B^~_&S,t[14]=O^~N&J,t[15]=z^~j&M,t[24]=V^~D&Y,t[25]=F^~W&K,t[34]=Q^~X&$,t[35]=T^~Z&tt,t[44]=ot^~st&ft,t[45]=at^~ut&ct,t[6]=g^~k&y,t[7]=_^~S&b,t[16]=N^~J&C,t[17]=j^~M&x,t[26]=D^~Y&H,t[27]=W^~K&I,t[36]=X^~$&q,t[37]=Z^~tt&G,t[46]=st^~ft&et,t[47]=ut^~ct&rt,t[8]=k^~y&A,t[9]=S^~b&w,t[18]=J^~C&m,t[19]=M^~x&E,t[28]=Y^~H&R,t[29]=K^~I&U,t[38]=$^~q&L,t[39]=tt^~G&P,t[48]=ft^~et&nt,t[49]=ct^~rt&it,t[0]^=p[n],t[1]^=p[n+1]};if(a)module.exports=S;else{for(x=0;x<C.length;++x)i[C[x]]=S[C[x]];s&&define(function(){return S})}}();/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";function t(t,i){i?(d[0]=d[16]=d[1]=d[2]=d[3]=d[4]=d[5]=d[6]=d[7]=d[8]=d[9]=d[10]=d[11]=d[12]=d[13]=d[14]=d[15]=0,this.blocks=d):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function i(i,r,s){var e,n=typeof i;if("string"===n){var o,a=[],u=i.length,c=0;for(e=0;e<u;++e)(o=i.charCodeAt(e))<128?a[c++]=o:o<2048?(a[c++]=192|o>>6,a[c++]=128|63&o):o<55296||o>=57344?(a[c++]=224|o>>12,a[c++]=128|o>>6&63,a[c++]=128|63&o):(o=65536+((1023&o)<<10|1023&i.charCodeAt(++e)),a[c++]=240|o>>18,a[c++]=128|o>>12&63,a[c++]=128|o>>6&63,a[c++]=128|63&o);i=a}else{if("object"!==n)throw new Error(h);if(null===i)throw new Error(h);if(f&&i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(!(Array.isArray(i)||f&&ArrayBuffer.isView(i)))throw new Error(h)}i.length>64&&(i=new t(r,!0).update(i).array());var y=[],p=[];for(e=0;e<64;++e){var l=i[e]||0;y[e]=92^l,p[e]=54^l}t.call(this,r,s),this.update(p),this.oKeyPad=y,this.inner=!0,this.sharedMemory=s}var h="input is invalid type",r="object"==typeof window,s=r?window:{};s.JS_SHA256_NO_WINDOW&&(r=!1);var e=!r&&"object"==typeof self,n=!s.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;n?s=global:e&&(s=self);var o=!s.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,a="function"==typeof define&&define.amd,f=!s.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,u="0123456789abcdef".split(""),c=[-2147483648,8388608,32768,128],y=[24,16,8,0],p=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],l=["hex","array","digest","arrayBuffer"],d=[];!s.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!f||!s.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var A=function(i,h){return function(r){return new t(h,!0).update(r)[i]()}},w=function(i){var h=A("hex",i);n&&(h=b(h,i)),h.create=function(){return new t(i)},h.update=function(t){return h.create().update(t)};for(var r=0;r<l.length;++r){var s=l[r];h[s]=A(s,i)}return h},b=function(t,i){var r=eval("require('crypto')"),s=eval("require('buffer').Buffer"),e=i?"sha224":"sha256",n=function(i){if("string"==typeof i)return r.createHash(e).update(i,"utf8").digest("hex");if(null===i||void 0===i)throw new Error(h);return i.constructor===ArrayBuffer&&(i=new Uint8Array(i)),Array.isArray(i)||ArrayBuffer.isView(i)||i.constructor===s?r.createHash(e).update(new s(i)).digest("hex"):t(i)};return n},v=function(t,h){return function(r,s){return new i(r,h,!0).update(s)[t]()}},_=function(t){var h=v("hex",t);h.create=function(h){return new i(h,t)},h.update=function(t,i){return h.create(t).update(i)};for(var r=0;r<l.length;++r){var s=l[r];h[s]=v(s,t)}return h};t.prototype.update=function(t){if(!this.finalized){var i,r=typeof t;if("string"!==r){if("object"!==r)throw new Error(h);if(null===t)throw new Error(h);if(f&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||f&&ArrayBuffer.isView(t)))throw new Error(h);i=!0}for(var s,e,n=0,o=t.length,a=this.blocks;n<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),i)for(e=this.start;n<o&&e<64;++n)a[e>>2]|=t[n]<<y[3&e++];else for(e=this.start;n<o&&e<64;++n)(s=t.charCodeAt(n))<128?a[e>>2]|=s<<y[3&e++]:s<2048?(a[e>>2]|=(192|s>>6)<<y[3&e++],a[e>>2]|=(128|63&s)<<y[3&e++]):s<55296||s>=57344?(a[e>>2]|=(224|s>>12)<<y[3&e++],a[e>>2]|=(128|s>>6&63)<<y[3&e++],a[e>>2]|=(128|63&s)<<y[3&e++]):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++n)),a[e>>2]|=(240|s>>18)<<y[3&e++],a[e>>2]|=(128|s>>12&63)<<y[3&e++],a[e>>2]|=(128|s>>6&63)<<y[3&e++],a[e>>2]|=(128|63&s)<<y[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,i=this.lastByteIndex;t[16]=this.block,t[i>>2]|=c[3&i],this.block=t[16],i>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,i,h,r,s,e,n,o,a,f=this.h0,u=this.h1,c=this.h2,y=this.h3,l=this.h4,d=this.h5,A=this.h6,w=this.h7,b=this.blocks;for(t=16;t<64;++t)i=((s=b[t-15])>>>7|s<<25)^(s>>>18|s<<14)^s>>>3,h=((s=b[t-2])>>>17|s<<15)^(s>>>19|s<<13)^s>>>10,b[t]=b[t-16]+i+b[t-7]+h<<0;for(a=u&c,t=0;t<64;t+=4)this.first?(this.is224?(e=300032,w=(s=b[0]-1413257819)-150054599<<0,y=s+24177077<<0):(e=704751109,w=(s=b[0]-210244248)-1521486534<<0,y=s+143694565<<0),this.first=!1):(i=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),r=(e=f&u)^f&c^a,w=y+(s=w+(h=(l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7))+(l&d^~l&A)+p[t]+b[t])<<0,y=s+(i+r)<<0),i=(y>>>2|y<<30)^(y>>>13|y<<19)^(y>>>22|y<<10),r=(n=y&f)^y&u^e,A=c+(s=A+(h=(w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7))+(w&l^~w&d)+p[t+1]+b[t+1])<<0,i=((c=s+(i+r)<<0)>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),r=(o=c&y)^c&f^n,d=u+(s=d+(h=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7))+(A&w^~A&l)+p[t+2]+b[t+2])<<0,i=((u=s+(i+r)<<0)>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),r=(a=u&c)^u&y^o,l=f+(s=l+(h=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&A^~d&w)+p[t+3]+b[t+3])<<0,f=s+(i+r)<<0;this.h0=this.h0+f<<0,this.h1=this.h1+u<<0,this.h2=this.h2+c<<0,this.h3=this.h3+y<<0,this.h4=this.h4+l<<0,this.h5=this.h5+d<<0,this.h6=this.h6+A<<0,this.h7=this.h7+w<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,r=this.h3,s=this.h4,e=this.h5,n=this.h6,o=this.h7,a=u[t>>28&15]+u[t>>24&15]+u[t>>20&15]+u[t>>16&15]+u[t>>12&15]+u[t>>8&15]+u[t>>4&15]+u[15&t]+u[i>>28&15]+u[i>>24&15]+u[i>>20&15]+u[i>>16&15]+u[i>>12&15]+u[i>>8&15]+u[i>>4&15]+u[15&i]+u[h>>28&15]+u[h>>24&15]+u[h>>20&15]+u[h>>16&15]+u[h>>12&15]+u[h>>8&15]+u[h>>4&15]+u[15&h]+u[r>>28&15]+u[r>>24&15]+u[r>>20&15]+u[r>>16&15]+u[r>>12&15]+u[r>>8&15]+u[r>>4&15]+u[15&r]+u[s>>28&15]+u[s>>24&15]+u[s>>20&15]+u[s>>16&15]+u[s>>12&15]+u[s>>8&15]+u[s>>4&15]+u[15&s]+u[e>>28&15]+u[e>>24&15]+u[e>>20&15]+u[e>>16&15]+u[e>>12&15]+u[e>>8&15]+u[e>>4&15]+u[15&e]+u[n>>28&15]+u[n>>24&15]+u[n>>20&15]+u[n>>16&15]+u[n>>12&15]+u[n>>8&15]+u[n>>4&15]+u[15&n];return this.is224||(a+=u[o>>28&15]+u[o>>24&15]+u[o>>20&15]+u[o>>16&15]+u[o>>12&15]+u[o>>8&15]+u[o>>4&15]+u[15&o]),a},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,r=this.h3,s=this.h4,e=this.h5,n=this.h6,o=this.h7,a=[t>>24&255,t>>16&255,t>>8&255,255&t,i>>24&255,i>>16&255,i>>8&255,255&i,h>>24&255,h>>16&255,h>>8&255,255&h,r>>24&255,r>>16&255,r>>8&255,255&r,s>>24&255,s>>16&255,s>>8&255,255&s,e>>24&255,e>>16&255,e>>8&255,255&e,n>>24&255,n>>16&255,n>>8&255,255&n];return this.is224||a.push(o>>24&255,o>>16&255,o>>8&255,255&o),a},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),i=new DataView(t);return i.setUint32(0,this.h0),i.setUint32(4,this.h1),i.setUint32(8,this.h2),i.setUint32(12,this.h3),i.setUint32(16,this.h4),i.setUint32(20,this.h5),i.setUint32(24,this.h6),this.is224||i.setUint32(28,this.h7),t},i.prototype=new t,i.prototype.finalize=function(){if(t.prototype.finalize.call(this),this.inner){this.inner=!1;var i=this.array();t.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(i),t.prototype.finalize.call(this)}};var B=w();B.sha256=B,B.sha224=w(!0),B.sha256.hmac=_(),B.sha224.hmac=_(!0),o?module.exports=B:(s.sha256=B.sha256,s.sha224=B.sha224,a&&define(function(){return B}))}();/*
 * [js-sha512]{@link https://github.com/emn178/js-sha512}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2018
 * @license MIT
 */
!function(){"use strict";function h(h,t){t?(p[0]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=p[16]=p[17]=p[18]=p[19]=p[20]=p[21]=p[22]=p[23]=p[24]=p[25]=p[26]=p[27]=p[28]=p[29]=p[30]=p[31]=p[32]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],384==h?(this.h0h=3418070365,this.h0l=3238371032,this.h1h=1654270250,this.h1l=914150663,this.h2h=2438529370,this.h2l=812702999,this.h3h=355462360,this.h3l=4144912697,this.h4h=1731405415,this.h4l=4290775857,this.h5h=2394180231,this.h5l=1750603025,this.h6h=3675008525,this.h6l=1694076839,this.h7h=1203062813,this.h7l=3204075428):256==h?(this.h0h=573645204,this.h0l=4230739756,this.h1h=2673172387,this.h1l=3360449730,this.h2h=596883563,this.h2l=1867755857,this.h3h=2520282905,this.h3l=1497426621,this.h4h=2519219938,this.h4l=2827943907,this.h5h=3193839141,this.h5l=1401305490,this.h6h=721525244,this.h6l=746961066,this.h7h=246885852,this.h7l=2177182882):224==h?(this.h0h=2352822216,this.h0l=424955298,this.h1h=1944164710,this.h1l=2312950998,this.h2h=502970286,this.h2l=855612546,this.h3h=1738396948,this.h3l=1479516111,this.h4h=258812777,this.h4l=2077511080,this.h5h=2011393907,this.h5l=79989058,this.h6h=1067287976,this.h6l=1780299464,this.h7h=286451373,this.h7l=2446758561):(this.h0h=1779033703,this.h0l=4089235720,this.h1h=3144134277,this.h1l=2227873595,this.h2h=1013904242,this.h2l=4271175723,this.h3h=2773480762,this.h3l=1595750129,this.h4h=1359893119,this.h4l=2917565137,this.h5h=2600822924,this.h5l=725511199,this.h6h=528734635,this.h6l=4215389547,this.h7h=1541459225,this.h7l=327033209),this.bits=h,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1}function t(t,s,e){var r,n=typeof t;if("string"!==n){if("object"!==n)throw new Error(i);if(null===t)throw new Error(i);if(a&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||a&&ArrayBuffer.isView(t)))throw new Error(i);r=!0}var o=t.length;if(!r){for(var l,f=[],c=(o=t.length,0),u=0;u<o;++u)(l=t.charCodeAt(u))<128?f[c++]=l:l<2048?(f[c++]=192|l>>6,f[c++]=128|63&l):l<55296||l>=57344?(f[c++]=224|l>>12,f[c++]=128|l>>6&63,f[c++]=128|63&l):(l=65536+((1023&l)<<10|1023&t.charCodeAt(++u)),f[c++]=240|l>>18,f[c++]=128|l>>12&63,f[c++]=128|l>>6&63,f[c++]=128|63&l);t=f}t.length>128&&(t=new h(s,!0).update(t).array());var y=[],p=[];for(u=0;u<128;++u){var d=t[u]||0;y[u]=92^d,p[u]=54^d}h.call(this,s,e),this.update(p),this.oKeyPad=y,this.inner=!0,this.sharedMemory=e}var i="input is invalid type",s="object"==typeof window,e=s?window:{};e.JS_SHA512_NO_WINDOW&&(s=!1);var r=!s&&"object"==typeof self;!e.JS_SHA512_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node?e=global:r&&(e=self);var n=!e.JS_SHA512_NO_COMMON_JS&&"object"==typeof module&&module.exports,o="function"==typeof define&&define.amd,a=!e.JS_SHA512_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,l="0123456789abcdef".split(""),f=[-2147483648,8388608,32768,128],c=[24,16,8,0],u=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],y=["hex","array","digest","arrayBuffer"],p=[];!e.JS_SHA512_NO_NODE_JS&&Array.isArray||(Array.isArray=function(h){return"[object Array]"===Object.prototype.toString.call(h)}),!a||!e.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(h){return"object"==typeof h&&h.buffer&&h.buffer.constructor===ArrayBuffer});var d=function(t,i){return function(s){return new h(i,!0).update(s)[t]()}},b=function(t){var i=d("hex",t);i.create=function(){return new h(t)},i.update=function(h){return i.create().update(h)};for(var s=0;s<y.length;++s){var e=y[s];i[e]=d(e,t)}return i},w=function(h,i){return function(s,e){return new t(s,i,!0).update(e)[h]()}},A=function(h){var i=w("hex",h);i.create=function(i){return new t(i,h)},i.update=function(h,t){return i.create(h).update(t)};for(var s=0;s<y.length;++s){var e=y[s];i[e]=w(e,h)}return i};h.prototype.update=function(h){if(this.finalized)throw new Error("finalize already called");var t,s=typeof h;if("string"!==s){if("object"!==s)throw new Error(i);if(null===h)throw new Error(i);if(a&&h.constructor===ArrayBuffer)h=new Uint8Array(h);else if(!(Array.isArray(h)||a&&ArrayBuffer.isView(h)))throw new Error(i);t=!0}for(var e,r,n=0,o=h.length,l=this.blocks;n<o;){if(this.hashed&&(this.hashed=!1,l[0]=this.block,l[1]=l[2]=l[3]=l[4]=l[5]=l[6]=l[7]=l[8]=l[9]=l[10]=l[11]=l[12]=l[13]=l[14]=l[15]=l[16]=l[17]=l[18]=l[19]=l[20]=l[21]=l[22]=l[23]=l[24]=l[25]=l[26]=l[27]=l[28]=l[29]=l[30]=l[31]=l[32]=0),t)for(r=this.start;n<o&&r<128;++n)l[r>>2]|=h[n]<<c[3&r++];else for(r=this.start;n<o&&r<128;++n)(e=h.charCodeAt(n))<128?l[r>>2]|=e<<c[3&r++]:e<2048?(l[r>>2]|=(192|e>>6)<<c[3&r++],l[r>>2]|=(128|63&e)<<c[3&r++]):e<55296||e>=57344?(l[r>>2]|=(224|e>>12)<<c[3&r++],l[r>>2]|=(128|e>>6&63)<<c[3&r++],l[r>>2]|=(128|63&e)<<c[3&r++]):(e=65536+((1023&e)<<10|1023&h.charCodeAt(++n)),l[r>>2]|=(240|e>>18)<<c[3&r++],l[r>>2]|=(128|e>>12&63)<<c[3&r++],l[r>>2]|=(128|e>>6&63)<<c[3&r++],l[r>>2]|=(128|63&e)<<c[3&r++]);this.lastByteIndex=r,this.bytes+=r-this.start,r>=128?(this.block=l[32],this.start=r-128,this.hash(),this.hashed=!0):this.start=r}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this},h.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var h=this.blocks,t=this.lastByteIndex;h[32]=this.block,h[t>>2]|=f[3&t],this.block=h[32],t>=112&&(this.hashed||this.hash(),h[0]=this.block,h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=h[7]=h[8]=h[9]=h[10]=h[11]=h[12]=h[13]=h[14]=h[15]=h[16]=h[17]=h[18]=h[19]=h[20]=h[21]=h[22]=h[23]=h[24]=h[25]=h[26]=h[27]=h[28]=h[29]=h[30]=h[31]=h[32]=0),h[30]=this.hBytes<<3|this.bytes>>>29,h[31]=this.bytes<<3,this.hash()}},h.prototype.hash=function(){var h,t,i,s,e,r,n,o,a,l,f,c,y,p,d,b,w,A,_,v,B,U,S,g,k,z=this.h0h,E=this.h0l,O=this.h1h,m=this.h1l,x=this.h2h,N=this.h2l,j=this.h3h,J=this.h3l,H=this.h4h,I=this.h4l,R=this.h5h,V=this.h5l,C=this.h6h,K=this.h6l,P=this.h7h,D=this.h7l,F=this.blocks;for(h=32;h<160;h+=2)t=((v=F[h-30])>>>1|(B=F[h-29])<<31)^(v>>>8|B<<24)^v>>>7,i=(B>>>1|v<<31)^(B>>>8|v<<24)^(B>>>7|v<<25),s=((v=F[h-4])>>>19|(B=F[h-3])<<13)^(B>>>29|v<<3)^v>>>6,e=(B>>>19|v<<13)^(v>>>29|B<<3)^(B>>>6|v<<26),v=F[h-32],B=F[h-31],a=((U=F[h-14])>>>16)+(v>>>16)+(t>>>16)+(s>>>16)+((o=(65535&U)+(65535&v)+(65535&t)+(65535&s)+((n=((S=F[h-13])>>>16)+(B>>>16)+(i>>>16)+(e>>>16)+((r=(65535&S)+(65535&B)+(65535&i)+(65535&e))>>>16))>>>16))>>>16),F[h]=a<<16|65535&o,F[h+1]=n<<16|65535&r;var M=z,T=E,W=O,Y=m,q=x,G=N,L=j,Q=J,X=H,Z=I,$=R,hh=V,th=C,ih=K,sh=P,eh=D;for(b=W&q,w=Y&G,h=0;h<160;h+=8)t=(M>>>28|T<<4)^(T>>>2|M<<30)^(T>>>7|M<<25),i=(T>>>28|M<<4)^(M>>>2|T<<30)^(M>>>7|T<<25),s=(X>>>14|Z<<18)^(X>>>18|Z<<14)^(Z>>>9|X<<23),e=(Z>>>14|X<<18)^(Z>>>18|X<<14)^(X>>>9|Z<<23),A=(l=M&W)^M&q^b,_=(f=T&Y)^T&G^w,g=X&$^~X&th,k=Z&hh^~Z&ih,v=F[h],B=F[h+1],v=(a=((U=u[h])>>>16)+(v>>>16)+(g>>>16)+(s>>>16)+(sh>>>16)+((o=(65535&U)+(65535&v)+(65535&g)+(65535&s)+(65535&sh)+((n=((S=u[h+1])>>>16)+(B>>>16)+(k>>>16)+(e>>>16)+(eh>>>16)+((r=(65535&S)+(65535&B)+(65535&k)+(65535&e)+(65535&eh))>>>16))>>>16))>>>16))<<16|65535&o,B=n<<16|65535&r,U=(a=(A>>>16)+(t>>>16)+((o=(65535&A)+(65535&t)+((n=(_>>>16)+(i>>>16)+((r=(65535&_)+(65535&i))>>>16))>>>16))>>>16))<<16|65535&o,S=n<<16|65535&r,sh=(a=(L>>>16)+(v>>>16)+((o=(65535&L)+(65535&v)+((n=(Q>>>16)+(B>>>16)+((r=(65535&Q)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,eh=n<<16|65535&r,t=((L=(a=(U>>>16)+(v>>>16)+((o=(65535&U)+(65535&v)+((n=(S>>>16)+(B>>>16)+((r=(65535&S)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o)>>>28|(Q=n<<16|65535&r)<<4)^(Q>>>2|L<<30)^(Q>>>7|L<<25),i=(Q>>>28|L<<4)^(L>>>2|Q<<30)^(L>>>7|Q<<25),s=(sh>>>14|eh<<18)^(sh>>>18|eh<<14)^(eh>>>9|sh<<23),e=(eh>>>14|sh<<18)^(eh>>>18|sh<<14)^(sh>>>9|eh<<23),A=(c=L&M)^L&W^l,_=(y=Q&T)^Q&Y^f,g=sh&X^~sh&$,k=eh&Z^~eh&hh,v=F[h+2],B=F[h+3],v=(a=((U=u[h+2])>>>16)+(v>>>16)+(g>>>16)+(s>>>16)+(th>>>16)+((o=(65535&U)+(65535&v)+(65535&g)+(65535&s)+(65535&th)+((n=((S=u[h+3])>>>16)+(B>>>16)+(k>>>16)+(e>>>16)+(ih>>>16)+((r=(65535&S)+(65535&B)+(65535&k)+(65535&e)+(65535&ih))>>>16))>>>16))>>>16))<<16|65535&o,B=n<<16|65535&r,U=(a=(A>>>16)+(t>>>16)+((o=(65535&A)+(65535&t)+((n=(_>>>16)+(i>>>16)+((r=(65535&_)+(65535&i))>>>16))>>>16))>>>16))<<16|65535&o,S=n<<16|65535&r,th=(a=(q>>>16)+(v>>>16)+((o=(65535&q)+(65535&v)+((n=(G>>>16)+(B>>>16)+((r=(65535&G)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,ih=n<<16|65535&r,t=((q=(a=(U>>>16)+(v>>>16)+((o=(65535&U)+(65535&v)+((n=(S>>>16)+(B>>>16)+((r=(65535&S)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o)>>>28|(G=n<<16|65535&r)<<4)^(G>>>2|q<<30)^(G>>>7|q<<25),i=(G>>>28|q<<4)^(q>>>2|G<<30)^(q>>>7|G<<25),s=(th>>>14|ih<<18)^(th>>>18|ih<<14)^(ih>>>9|th<<23),e=(ih>>>14|th<<18)^(ih>>>18|th<<14)^(th>>>9|ih<<23),A=(p=q&L)^q&M^c,_=(d=G&Q)^G&T^y,g=th&sh^~th&X,k=ih&eh^~ih&Z,v=F[h+4],B=F[h+5],v=(a=((U=u[h+4])>>>16)+(v>>>16)+(g>>>16)+(s>>>16)+($>>>16)+((o=(65535&U)+(65535&v)+(65535&g)+(65535&s)+(65535&$)+((n=((S=u[h+5])>>>16)+(B>>>16)+(k>>>16)+(e>>>16)+(hh>>>16)+((r=(65535&S)+(65535&B)+(65535&k)+(65535&e)+(65535&hh))>>>16))>>>16))>>>16))<<16|65535&o,B=n<<16|65535&r,U=(a=(A>>>16)+(t>>>16)+((o=(65535&A)+(65535&t)+((n=(_>>>16)+(i>>>16)+((r=(65535&_)+(65535&i))>>>16))>>>16))>>>16))<<16|65535&o,S=n<<16|65535&r,$=(a=(W>>>16)+(v>>>16)+((o=(65535&W)+(65535&v)+((n=(Y>>>16)+(B>>>16)+((r=(65535&Y)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,hh=n<<16|65535&r,t=((W=(a=(U>>>16)+(v>>>16)+((o=(65535&U)+(65535&v)+((n=(S>>>16)+(B>>>16)+((r=(65535&S)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o)>>>28|(Y=n<<16|65535&r)<<4)^(Y>>>2|W<<30)^(Y>>>7|W<<25),i=(Y>>>28|W<<4)^(W>>>2|Y<<30)^(W>>>7|Y<<25),s=($>>>14|hh<<18)^($>>>18|hh<<14)^(hh>>>9|$<<23),e=(hh>>>14|$<<18)^(hh>>>18|$<<14)^($>>>9|hh<<23),A=(b=W&q)^W&L^p,_=(w=Y&G)^Y&Q^d,g=$&th^~$&sh,k=hh&ih^~hh&eh,v=F[h+6],B=F[h+7],v=(a=((U=u[h+6])>>>16)+(v>>>16)+(g>>>16)+(s>>>16)+(X>>>16)+((o=(65535&U)+(65535&v)+(65535&g)+(65535&s)+(65535&X)+((n=((S=u[h+7])>>>16)+(B>>>16)+(k>>>16)+(e>>>16)+(Z>>>16)+((r=(65535&S)+(65535&B)+(65535&k)+(65535&e)+(65535&Z))>>>16))>>>16))>>>16))<<16|65535&o,B=n<<16|65535&r,U=(a=(A>>>16)+(t>>>16)+((o=(65535&A)+(65535&t)+((n=(_>>>16)+(i>>>16)+((r=(65535&_)+(65535&i))>>>16))>>>16))>>>16))<<16|65535&o,S=n<<16|65535&r,X=(a=(M>>>16)+(v>>>16)+((o=(65535&M)+(65535&v)+((n=(T>>>16)+(B>>>16)+((r=(65535&T)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,Z=n<<16|65535&r,M=(a=(U>>>16)+(v>>>16)+((o=(65535&U)+(65535&v)+((n=(S>>>16)+(B>>>16)+((r=(65535&S)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,T=n<<16|65535&r;a=(z>>>16)+(M>>>16)+((o=(65535&z)+(65535&M)+((n=(E>>>16)+(T>>>16)+((r=(65535&E)+(65535&T))>>>16))>>>16))>>>16),this.h0h=a<<16|65535&o,this.h0l=n<<16|65535&r,a=(O>>>16)+(W>>>16)+((o=(65535&O)+(65535&W)+((n=(m>>>16)+(Y>>>16)+((r=(65535&m)+(65535&Y))>>>16))>>>16))>>>16),this.h1h=a<<16|65535&o,this.h1l=n<<16|65535&r,a=(x>>>16)+(q>>>16)+((o=(65535&x)+(65535&q)+((n=(N>>>16)+(G>>>16)+((r=(65535&N)+(65535&G))>>>16))>>>16))>>>16),this.h2h=a<<16|65535&o,this.h2l=n<<16|65535&r,a=(j>>>16)+(L>>>16)+((o=(65535&j)+(65535&L)+((n=(J>>>16)+(Q>>>16)+((r=(65535&J)+(65535&Q))>>>16))>>>16))>>>16),this.h3h=a<<16|65535&o,this.h3l=n<<16|65535&r,a=(H>>>16)+(X>>>16)+((o=(65535&H)+(65535&X)+((n=(I>>>16)+(Z>>>16)+((r=(65535&I)+(65535&Z))>>>16))>>>16))>>>16),this.h4h=a<<16|65535&o,this.h4l=n<<16|65535&r,a=(R>>>16)+($>>>16)+((o=(65535&R)+(65535&$)+((n=(V>>>16)+(hh>>>16)+((r=(65535&V)+(65535&hh))>>>16))>>>16))>>>16),this.h5h=a<<16|65535&o,this.h5l=n<<16|65535&r,a=(C>>>16)+(th>>>16)+((o=(65535&C)+(65535&th)+((n=(K>>>16)+(ih>>>16)+((r=(65535&K)+(65535&ih))>>>16))>>>16))>>>16),this.h6h=a<<16|65535&o,this.h6l=n<<16|65535&r,a=(P>>>16)+(sh>>>16)+((o=(65535&P)+(65535&sh)+((n=(D>>>16)+(eh>>>16)+((r=(65535&D)+(65535&eh))>>>16))>>>16))>>>16),this.h7h=a<<16|65535&o,this.h7l=n<<16|65535&r},h.prototype.hex=function(){this.finalize();var h=this.h0h,t=this.h0l,i=this.h1h,s=this.h1l,e=this.h2h,r=this.h2l,n=this.h3h,o=this.h3l,a=this.h4h,f=this.h4l,c=this.h5h,u=this.h5l,y=this.h6h,p=this.h6l,d=this.h7h,b=this.h7l,w=this.bits,A=l[h>>28&15]+l[h>>24&15]+l[h>>20&15]+l[h>>16&15]+l[h>>12&15]+l[h>>8&15]+l[h>>4&15]+l[15&h]+l[t>>28&15]+l[t>>24&15]+l[t>>20&15]+l[t>>16&15]+l[t>>12&15]+l[t>>8&15]+l[t>>4&15]+l[15&t]+l[i>>28&15]+l[i>>24&15]+l[i>>20&15]+l[i>>16&15]+l[i>>12&15]+l[i>>8&15]+l[i>>4&15]+l[15&i]+l[s>>28&15]+l[s>>24&15]+l[s>>20&15]+l[s>>16&15]+l[s>>12&15]+l[s>>8&15]+l[s>>4&15]+l[15&s]+l[e>>28&15]+l[e>>24&15]+l[e>>20&15]+l[e>>16&15]+l[e>>12&15]+l[e>>8&15]+l[e>>4&15]+l[15&e]+l[r>>28&15]+l[r>>24&15]+l[r>>20&15]+l[r>>16&15]+l[r>>12&15]+l[r>>8&15]+l[r>>4&15]+l[15&r]+l[n>>28&15]+l[n>>24&15]+l[n>>20&15]+l[n>>16&15]+l[n>>12&15]+l[n>>8&15]+l[n>>4&15]+l[15&n];return w>=256&&(A+=l[o>>28&15]+l[o>>24&15]+l[o>>20&15]+l[o>>16&15]+l[o>>12&15]+l[o>>8&15]+l[o>>4&15]+l[15&o]),w>=384&&(A+=l[a>>28&15]+l[a>>24&15]+l[a>>20&15]+l[a>>16&15]+l[a>>12&15]+l[a>>8&15]+l[a>>4&15]+l[15&a]+l[f>>28&15]+l[f>>24&15]+l[f>>20&15]+l[f>>16&15]+l[f>>12&15]+l[f>>8&15]+l[f>>4&15]+l[15&f]+l[c>>28&15]+l[c>>24&15]+l[c>>20&15]+l[c>>16&15]+l[c>>12&15]+l[c>>8&15]+l[c>>4&15]+l[15&c]+l[u>>28&15]+l[u>>24&15]+l[u>>20&15]+l[u>>16&15]+l[u>>12&15]+l[u>>8&15]+l[u>>4&15]+l[15&u]),512==w&&(A+=l[y>>28&15]+l[y>>24&15]+l[y>>20&15]+l[y>>16&15]+l[y>>12&15]+l[y>>8&15]+l[y>>4&15]+l[15&y]+l[p>>28&15]+l[p>>24&15]+l[p>>20&15]+l[p>>16&15]+l[p>>12&15]+l[p>>8&15]+l[p>>4&15]+l[15&p]+l[d>>28&15]+l[d>>24&15]+l[d>>20&15]+l[d>>16&15]+l[d>>12&15]+l[d>>8&15]+l[d>>4&15]+l[15&d]+l[b>>28&15]+l[b>>24&15]+l[b>>20&15]+l[b>>16&15]+l[b>>12&15]+l[b>>8&15]+l[b>>4&15]+l[15&b]),A},h.prototype.toString=h.prototype.hex,h.prototype.digest=function(){this.finalize();var h=this.h0h,t=this.h0l,i=this.h1h,s=this.h1l,e=this.h2h,r=this.h2l,n=this.h3h,o=this.h3l,a=this.h4h,l=this.h4l,f=this.h5h,c=this.h5l,u=this.h6h,y=this.h6l,p=this.h7h,d=this.h7l,b=this.bits,w=[h>>24&255,h>>16&255,h>>8&255,255&h,t>>24&255,t>>16&255,t>>8&255,255&t,i>>24&255,i>>16&255,i>>8&255,255&i,s>>24&255,s>>16&255,s>>8&255,255&s,e>>24&255,e>>16&255,e>>8&255,255&e,r>>24&255,r>>16&255,r>>8&255,255&r,n>>24&255,n>>16&255,n>>8&255,255&n];return b>=256&&w.push(o>>24&255,o>>16&255,o>>8&255,255&o),b>=384&&w.push(a>>24&255,a>>16&255,a>>8&255,255&a,l>>24&255,l>>16&255,l>>8&255,255&l,f>>24&255,f>>16&255,f>>8&255,255&f,c>>24&255,c>>16&255,c>>8&255,255&c),512==b&&w.push(u>>24&255,u>>16&255,u>>8&255,255&u,y>>24&255,y>>16&255,y>>8&255,255&y,p>>24&255,p>>16&255,p>>8&255,255&p,d>>24&255,d>>16&255,d>>8&255,255&d),w},h.prototype.array=h.prototype.digest,h.prototype.arrayBuffer=function(){this.finalize();var h=this.bits,t=new ArrayBuffer(h/8),i=new DataView(t);return i.setUint32(0,this.h0h),i.setUint32(4,this.h0l),i.setUint32(8,this.h1h),i.setUint32(12,this.h1l),i.setUint32(16,this.h2h),i.setUint32(20,this.h2l),i.setUint32(24,this.h3h),h>=256&&i.setUint32(28,this.h3l),h>=384&&(i.setUint32(32,this.h4h),i.setUint32(36,this.h4l),i.setUint32(40,this.h5h),i.setUint32(44,this.h5l)),512==h&&(i.setUint32(48,this.h6h),i.setUint32(52,this.h6l),i.setUint32(56,this.h7h),i.setUint32(60,this.h7l)),t},h.prototype.clone=function(){var t=new h(this.bits,!1);return this.copyTo(t),t},h.prototype.copyTo=function(h){var t=0,i=["h0h","h0l","h1h","h1l","h2h","h2l","h3h","h3l","h4h","h4l","h5h","h5l","h6h","h6l","h7h","h7l","start","bytes","hBytes","finalized","hashed","lastByteIndex"];for(t=0;t<i.length;++t)h[i[t]]=this[i[t]];for(t=0;t<this.blocks.length;++t)h.blocks[t]=this.blocks[t]},(t.prototype=new h).finalize=function(){if(h.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();h.call(this,this.bits,this.sharedMemory),this.update(this.oKeyPad),this.update(t),h.prototype.finalize.call(this)}},t.prototype.clone=function(){var h=new t([],this.bits,!1);this.copyTo(h),h.inner=this.inner;for(var i=0;i<this.oKeyPad.length;++i)h.oKeyPad[i]=this.oKeyPad[i];return h};var _=b(512);_.sha512=_,_.sha384=b(384),_.sha512_256=b(256),_.sha512_224=b(224),_.sha512.hmac=A(512),_.sha384.hmac=A(384),_.sha512_256.hmac=A(256),_.sha512_224.hmac=A(224),n?module.exports=_:(e.sha512=_.sha512,e.sha384=_.sha384,e.sha512_256=_.sha512_256,e.sha512_224=_.sha512_224,o&&define(function(){return _}))}();
