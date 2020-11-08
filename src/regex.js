function autoLinkUrls(txt) {
    return txt.replace(/(^|\s)(https?|ftp)(:[^'"<>\s]+)/gi,
        "$1<a target=\"_blank\" href=\"$2$3\">$2$3</a>");
}


'Hello World!'
.replace('!', '?')
.concat('~')
.link('#')
.fontcolor('red')


function createSearchRegex(query, caseSensitive, isRegex) {
    var regexFlags = caseSensitive ? "g" : "gi";
    var regexObject;

    if (isRegex) {
        try {
            regexObject = new RegExp(query, regexFlags);
        } catch (e) {
            // Silent catch.
        }
    }

    if (!regexObject)
        regexObject = createPlainTextSearchRegex(query, regexFlags);

    return regexObject;
}

function createPlainTextSearchRegex(query, flags) {
    // This should be kept the same as the one in ContentSearchUtils.cpp.
    var regexSpecialCharacters = String.regexSpecialCharacters();
    var regex = "";
    for (var i = 0; i < query.length; ++i) {
        var c = query.charAt(i);
        if (regexSpecialCharacters.indexOf(c) != -1)
            regex += "\\";
        regex += c;
    }
    return new RegExp(regex, flags || "");
}

function countRegexMatches(regex, content) {
    var text = content;
    var result = 0;
    var match;
    while (text && (match = regex.exec(text))) {
        if (match[0].length > 0)
            ++result;
        text = text.substring(match.index + 1);
    }
    return result;
}

function numberToStringWithSpacesPadding(value, symbolsCount) {
    var numberString = value.toString();
    var paddingLength = Math.max(0, symbolsCount - numberString.length);
    var paddingString = Array(paddingLength + 1).join("\u00a0");
    return paddingString + numberString;
}

//


function loadXHR(url, async, callback) {
    function onReadyStateChanged() {
        if (xhr.readyState !== XMLHttpRequest.DONE)
            return;

        if (xhr.status === 200) {
            callback(xhr.responseText);
            return;
        }

        callback(null);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, async);
    if (async)
        xhr.onreadystatechange = onReadyStateChanged;
    xhr.send(null);

    if (!async) {
        if (xhr.status === 200)
            return xhr.responseText;
        return null;
    }
    return null;
}

var _importedScripts = {};

function importScript(scriptName) {
    if (_importedScripts[scriptName])
        return;
    var xhr = new XMLHttpRequest();
    _importedScripts[scriptName] = true;
    if (window.flattenImports)
        scriptName = scriptName.split("/").reverse()[0];
    xhr.open("GET", scriptName, false);
    xhr.send(null);
    if (!xhr.responseText)
        throw "empty response arrived for script '" + scriptName + "'";
    var sourceURL = WebInspector.ParsedURL.completeURL(window.location.href, scriptName);
    window.eval(xhr.responseText + "\n//@ sourceURL=" + sourceURL);
}

var loadScript = importScript;