var convert = (inputString, inputType) => {
    console.log(inputString + ':' + inputType)

    let resp = convertString(inputString.toString(), inputType.toString());
    // let resp = JSON.parse(result);
    //console.log(resp);

    document.getElementById("hexString").value = resp.hexString;
    document.getElementById("asciiString").value = resp.asciiString;
    document.getElementById("decString").value = resp.decimalString;
    document.getElementById("base64String").value = resp.base64String;
    document.getElementById("binaryString").value = resp.binaryString;
}

var copyText = (elem) => {
    elem.select();
    elem.setSelectionRange(0, 9999);
    document.execCommand("copy");
}

var removeWhiteSpace = (elem) => {
    console.log(elem.value);
    elem.value = removeChar(elem.value, ' ');
}

var removeChar = (text, character) => {
    var splitText = text.split(character);
    return splitText.join('');
}

function convertString(inputString, inputType) {

    var hexString;
    var base64String;
    var binaryString;
    var asciiString;
    var decimalString;

    var response;

    if (inputString.length == 0) {
        response = {
            statusCode: 200,
            hexString: "",
            asciiString: "",
            binaryString: "",
            base64String: "",
            decimalString: "",
            inputType: inputType
        };
    }

    else {

        switch (inputType) {

            case 'ascii':

                asciiString = inputString;

                hexString = asciiToHex(inputString);

                base64String = Base64.asciiToBase64(inputString);

                decimalString = hexToDecimal(hexString);

                binaryString = hexToBinary(hexString);

                break;

            case 'hex':

                asciiString = hexToAscii(inputString);

                hexString = inputString;

                base64String = Base64.asciiToBase64(asciiString);

                decimalString = hexToDecimal(hexString);

                binaryString = hexToBinary(hexString);

                break;

            case 'base64':

                asciiString = Base64.base64ToAscii(inputString);

                hexString = asciiToHex(asciiString);

                base64String = inputString

                decimalString = hexToDecimal(hexString);

                binaryString = hexToBinary(hexString);

                break;

            case 'decimal':

                hexString = decimalToHex(inputString);

                asciiString = hexToAscii(hexString);

                base64String = Base64.asciiToBase64(asciiString);

                decimalString = inputString;

                binaryString = hexToBinary(hexString);

                break;

            case 'binary':

                hexString = binaryToHex(inputString);

                asciiString = hexToAscii(hexString);

                base64String = Base64.asciiToBase64(asciiString);

                decimalString = hexToDecimal(hexString);

                binaryString = inputString;

                break;

            default:
        }

        // Create a JSON object with our response and store it in a constant
        response = {
            statusCode: 200,
            hexString: hexString,
            asciiString: asciiString,
            binaryString: binaryString,
            base64String: base64String,
            decimalString: decimalString,
            inputType: inputType
        };
    }

    console.log(response);
    // Return the response constant
    return response;
};

//-----------------------HEX & Binary-------------------------
var hexToBinary = (hexString) => {
    hexStringValue = removeChar(hexString, ' ').trim();
    var binString = '';

    for (var i = 0; i < hexStringValue.length; i += 2) {
        binString += padLeft(parseInt(hexStringValue.substr(i, 2), 16).toString(2), '0', 8) + ' ';
    }

    return binString.trim();
}

var padLeft = (text, character, minLength) => {
    if (text.length >= minLength) {
        console.log("string has minimum length");
        return text;
    }

    var addLen = minLength - text.length;
    var appendText = '';
    for (i = addLen; i > 0; i--) {
        appendText += character;
    }

    return appendText + text;
}

var binaryToHex = (binaryString) => {
    var binString = padLeft(removeChar(binaryString.toString(), ' '), '0', 8);
    var hexArray = [];
    var hexString = '';

    for (i = 0; i < binString.length / 8; i++) {
        hexArray[i] = parseInt(binString.substr(8 * i, 8), 2).toString(16);
    }

    hexArray.forEach(element => {
        hexString += padLeft(element.toString(), '0', 2) + ' ';
    });

    return hexString.trim();
}

//-----------------------ASCII & HEX --------------------------

function asciiToHex(inputString) {
    var hexString = '';

    for (var n = 0, l = inputString.length; n < l; n++) {
        hexString += padLeft(inputString.charCodeAt(n).toString(16), '0', 2) + ' ';
    }

    return hexString.trim();
}

function hexToAscii(hexString) {
    try {
        var hex = removeChar(hexString.toString(), ' ');
        var asciiString = '';

        for (var n = 0; n < hex.length; n += 2) {
            asciiString += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }

        return asciiString;
    }
    catch (e) {
        return "Conversion error" + e;
    }

}

//------------------------HEX & Decimal------------------------

function hexToDecimal(inputString) {

    var hexString = inputString.toString();
    var decimalString = '';

    var hexArray = hexString.split(' ');

    for (var i = 0; i < hexArray.length; i++) {

        var hexVal = parseInt(hexArray[i], 16);
        if (!isNaN(hexVal)) {
            decimalString += hexVal.toString(10) + " ";
        }
    }

    return decimalString.trim();
}

function decimalToHex(inputString) {
    var hexString = '';
    var decString = inputString.toString();
    var splitStr = decString.split(' ');

    for (var i = 0; i < splitStr.length; i++) {

        var dec = parseInt(splitStr[i]);
        if (!isNaN(dec)) {
            hexString += padLeft(dec.toString(16), '0', 2) + ' ';
        }
    }

    return hexString.trim();
}


//-------------------------ASCII & BASE64-----------------------

const Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    asciiToBase64: function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

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

            output = output +
                Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    base64ToAscii: function (input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

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

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";

        for (let n = 0; n < string.length; n++) {

            let c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        let string = "";
        let i = 0;
        let c = 0;
        let c1 = 0;
        let c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                let c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }
}
