[Github Repository](https://github.com/RussellAbraham/js/)

------------------------------------------------------

# EcmaScript 2020 Language Specification

https://www.ecma-international.org/ecma-262/

------------------------------------------------------

# NodeJS

https://nodejs.org/

------------------------------------------------------

# MDN Web DOCS

https://developer.mozilla.org/en-US/

JavaScript Reference
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

Web API's
https://developer.mozilla.org/en-US/docs/Web/API

Global Objects
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

------------------------------------------------------

# W3 Schools

HTML 5
https://www.w3schools.com/html/default.asp

Graphics
https://www.w3schools.com/graphics/default.asp

CSS
https://www.w3schools.com/css/default.asp

JavaScript
https://www.w3schools.com/js/default.asp

------------------------------------------------------

## Github Trending JavaScript
https://github.com/trending/javascript?since=daily

## CSS Tricks
https://css-tricks.com/

## HTML5 Rocks
https://www.html5rocks.com/en/

## CodePen
https://codepen.io/

------------------------------------------------------


# Standard objects by category

Every Constructor is, at their core, just an object like this.

```javascript
{
	__defineGetter__: "[function]",
	__defineSetter__: "[function]",
	__lookupGetter__: "[function]",
	__lookupSetter__: "[function]",
}
```

It is common to see methods attached to them. These are some.

```javascript
constructor : "[function]",
hasOwnProperty : "[function]",
isPrototypeOf : "[function]",
propertyIsEnumerable : "[function]",
toLocaleString : "[function]",
toString : "[function]",
valueOf : "[function]"
```

## Value properties

These global properties return a simple value. They have no properties or methods.

* [Infinity]()
* [NaN]()
* [undefined]()
* [globalThis]()

## Function properties

These global functions—functions which are called globally, rather than on an object—directly return their results to the caller.

* eval()
* uneval() 
* isFinite()
* isNaN()
* parseFloat()
* parseInt()
* encodeURI()
* encodeURIComponent()
* decodeURI()
* decodeURIComponent()

Deprecated
* escape()
* unescape()

---

## Fundamental objects

These are the fundamental, basic objects upon which all other objects are based. This includes general objects, booleans, functions, and symbols.

* Object
* Function
* Boolean
* Symbol

## Error objects

Error objects are a special type of fundamental object. They include the basic Error type, as well as several specialized error types.

* Error
* AggregateError 
* EvalError
* InternalError
* RangeError
* ReferenceError
* SyntaxError
* TypeError
* URIError

## Numbers and dates

- These are the base objects representing numbers, dates, and mathematical calculations.

* Number
* BigInt
* Math
* Date 

### Text processing

These objects represent strings and support manipulating them.

* String
* RegExp

### Indexed collections

These objects represent collections of data which are ordered by an index value. This includes (typed) arrays and array-like constructs.

* Array
* Int8Array
* Uint8Array
* Uint8ClampedArray
* Int16Array
* Uint16Array
* Int32Array
* Uint32Array
* Float32Array
* Float64Array
* BigInt64Array
* BigUint64Array

### Keyed collections

These objects represent collections which use keys. The iterable collections (Map and Set) contain elements which are easily iterated in the order of insertion.

* Map
* Set
* WeakMap
* WeakSet

### Structured data

These objects represent and interact with structured data buffers and data coded using JavaScript Object Notation (JSON).

* ArrayBuffer
* SharedArrayBuffer
* Atomics
* DataView
* JSON

### Control abstraction objects

Control abstractions can help to structure code, especially async code (without using deeply nested callbacks, for example).

* Promise
* Generator
* GeneratorFunction
* AsyncFunction
* AsyncGenerator
* AsyncGeneratorFunction
* Reflection
* Reflect
* Proxy

### Internationalization

Additions to the ECMAScript core for language-sensitive functionalities.

* Intl
* Intl.Collator
* Intl.DateTimeFormat
* Intl.ListFormat
* Intl.NumberFormat
* Intl.PluralRules
* Intl.RelativeTimeFormat
* Intl.Locale
* WebAssembly
* WebAssembly
* WebAssembly.Module
* WebAssembly.Instance
* WebAssembly.Memory
* WebAssembly.Table
* WebAssembly.CompileError
* WebAssembly.LinkError
* WebAssembly.RuntimeError
* Other
* arguments

HTTP response status codes

100 Continue
101 Switching Protocols
103 Early Hints
200 OK
201 Created
202 Accepted
203 Non-Authoritative Information
204 No Content
205 Reset Content
206 Partial Content
300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
307 Temporary Redirect
308 Permanent Redirect
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Payload Too Large
414 URI Too Long
415 Unsupported Media Type
416 Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot
422 Unprocessable Entity
425 Too Early
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
451 Unavailable For Legal Reasons
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required
CSP directives
CSP: base-uri
CSP: block-all-mixed-content
CSP: child-src
CSP: connect-src
CSP: default-src
CSP: font-src
CSP: form-action
CSP: frame-ancestors
CSP: frame-src
CSP: img-src
CSP: manifest-src
CSP: media-src
CSP: navigate-to
CSP: object-src
CSP: plugin-types
CSP: prefetch-src
CSP: referrer
CSP: report-to
CSP: report-uri
CSP: require-sri-for
CSP: require-trusted-types-for
CSP: sandbox
CSP: script-src-attr
CSP: script-src-elem
CSP: script-src
CSP: style-src-attr
CSP: style-src-elem
CSP: style-src
CSP: trusted-types
CSP: upgrade-insecure-requests
CSP: worker-src

CORS errors

Reason: CORS header 'Access-Control-Allow-Origin' does not match 'xyz'
Reason: CORS request did not succeed
Reason: CORS disabled
Reason: CORS request external redirect not allowed
Reason: invalid token ‘xyz’ in CORS header ‘Access-Control-Allow-Headers’
Reason: invalid token ‘xyz’ in CORS header ‘Access-Control-Allow-Methods’
Reason: Did not find method in CORS header ‘Access-Control-Allow-Methods’
Reason: expected ‘true’ in CORS header ‘Access-Control-Allow-Credentials’
Reason: missing token ‘xyz’ in CORS header ‘Access-Control-Allow-Headers’ from CORS preflight channel
Reason: CORS header 'Access-Control-Allow-Origin' missing
Reason: Multiple CORS header 'Access-Control-Allow-Origin' not allowed
Reason: Credential is not supported if the CORS header ‘Access-Control-Allow-Origin’ is ‘*’
Reason: CORS header ‘Origin’ cannot be added
Reason: CORS preflight channel did not succeed
Reason: CORS request not HTTP
Feature-Policy directives
Feature-Policy: accelerometer
Feature-Policy: ambient-light-sensor
Feature-Policy: autoplay
Feature-Policy: battery
Feature-Policy: camera
Feature-Policy: display-capture
Feature-Policy: document-domain
Feature-Policy: encrypted-media
Feature-Policy: fullscreen
Feature-Policy: geolocation
Feature-Policy: gyroscope
Feature-Policy: layout-animations
Feature-Policy: legacy-image-formats
Feature-Policy: magnetometer
Feature-Policy: microphone
Feature-Policy: midi
Feature-Policy: oversized-images
Feature-Policy: payment
Feature-Policy: picture-in-picture
Feature-Policy: publickey-credentials-get
Feature-Policy: screen-wake-lock
Feature-Policy: sync-xhr
Feature-Policy: unoptimized-images
Feature-Policy: unsized-media
Feature-Policy: usb
Feature-Policy: vibrate
Feature-Policy: vr
Feature-Policy: wake-lock

web-share

Feature-Policy: xr-spatial-tracking
Feature-Policy: xr