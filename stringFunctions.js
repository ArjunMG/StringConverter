var convert=(e,r)=>{let t=convertString(e.toString(),r.toString());document.getElementById("hexString").value=t.hexString,document.getElementById("asciiString").value=t.asciiString,document.getElementById("decString").value=t.decimalString,document.getElementById("base64String").value=t.base64String,document.getElementById("binaryString").value=t.binaryString},copyText=e=>{e.select(),e.setSelectionRange(0,9999),navigator.clipboard.writeText(e.value)},removeWhiteSpace=e=>e.value=removeChar(e.value," "),removeChar=(e,r)=>{return e.split(r).join("")};function convertString(e,r){var t,a,i,n,o,c;if(0==e.length)c={statusCode:200,hexString:"",asciiString:"",binaryString:"",base64String:"",decimalString:"",inputType:r};else{switch(r){case"ascii":n=e,t=asciiToHex(e),a=Base64.asciiToBase64(e),o=hexToDecimal(t),i=hexToBinary(t);break;case"hex":n=hexToAscii(e),t=e,a=Base64.asciiToBase64(n),o=hexToDecimal(t),i=hexToBinary(t);break;case"base64":a=e,o=hexToDecimal(t=asciiToHex(n=Base64.base64ToAscii(e))),i=hexToBinary(t);break;case"decimal":n=hexToAscii(t=decimalToHex(e)),a=Base64.asciiToBase64(n),o=e,i=hexToBinary(t);break;case"binary":n=hexToAscii(t=binaryToHex(e)),a=Base64.asciiToBase64(n),o=hexToDecimal(t),i=e}c={statusCode:200,hexString:t,asciiString:n,binaryString:i,base64String:a,decimalString:o,inputType:r}}return c}var hexToBinary=e=>{hexStringValue=removeChar(e," ").trim(),hexStringValue=removeChar(hexStringValue,","),hexStringValue.length%2==1&&(hexStringValue="0"+hexStringValue);for(var r="",t=0;t<hexStringValue.length;t+=2)r+=padLeft(parseInt(hexStringValue.substr(t,2),16).toString(2),"0",8)+" ";return r.trim()},padLeft=(e,r,t)=>{if(e.length>=t)return e;var a=t-e.length,n="";for(i=a;i>0;i--)n+=r;return n+e},binaryToHex=e=>{var r=padLeft(removeChar(e.toString()," "),"0",8),t=[],a="";for(i=0;i<r.length/8;i++)t[i]=parseInt(r.substr(8*i,8),2).toString(16);return t.forEach(e=>{a+=padLeft(e.toString(),"0",2)+" "}),a.trim()};function asciiToHex(e){for(var r="",t=0,a=e.length;t<a;t++)r+=padLeft(e.charCodeAt(t).toString(16),"0",2)+" ";return r.trim()}function hexToAscii(e){try{var r=removeChar(e.toString()," ");r=removeChar(r,",");for(var t="",a=0;a<r.length;a+=2)t+=String.fromCharCode(parseInt(r.substr(a,2),16));return t}catch(e){return"Conversion error"+e}}function hexToDecimal(e){for(var r="",t=e.toString().split(",").join(" ").split(" "),a=0;a<t.length;a++){var i=parseInt(t[a],16);isNaN(i)||(r+=i.toString(10)+" ")}return r.trim()}function decimalToHex(e){for(var r="",t=e.toString().split(" "),a=0;a<t.length;a++){var i=parseInt(t[a]);isNaN(i)||(r+=padLeft(i.toString(16),"0",2)+" ")}return r.trim()}const Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",asciiToBase64:function(e){let r,t,a,i,n,o,c,s="",h=0;for(e=Base64._utf8_encode(e);h<e.length;)i=(r=e.charCodeAt(h++))>>2,n=(3&r)<<4|(t=e.charCodeAt(h++))>>4,o=(15&t)<<2|(a=e.charCodeAt(h++))>>6,c=63&a,isNaN(t)?o=c=64:isNaN(a)&&(c=64),s=s+Base64._keyStr.charAt(i)+Base64._keyStr.charAt(n)+Base64._keyStr.charAt(o)+Base64._keyStr.charAt(c);return s},base64ToAscii:function(e){let r,t,a,i,n,o,c,s="",h=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");h<e.length;)r=(i=Base64._keyStr.indexOf(e.charAt(h++)))<<2|(n=Base64._keyStr.indexOf(e.charAt(h++)))>>4,t=(15&n)<<4|(o=Base64._keyStr.indexOf(e.charAt(h++)))>>2,a=(3&o)<<6|(c=Base64._keyStr.indexOf(e.charAt(h++))),s+=String.fromCharCode(r),64!=o&&(s+=String.fromCharCode(t)),64!=c&&(s+=String.fromCharCode(a));return s=Base64._utf8_decode(s)},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");let r="";for(let t=0;t<e.length;t++){let a=e.charCodeAt(t);a<128?r+=String.fromCharCode(a):a>127&&a<2048?(r+=String.fromCharCode(a>>6|192),r+=String.fromCharCode(63&a|128)):(r+=String.fromCharCode(a>>12|224),r+=String.fromCharCode(a>>6&63|128),r+=String.fromCharCode(63&a|128))}return r},_utf8_decode:function(e){let r="",t=0,a=0,i=0;for(;t<e.length;)if((a=e.charCodeAt(t))<128)r+=String.fromCharCode(a),t++;else if(a>191&&a<224)i=e.charCodeAt(t+1),r+=String.fromCharCode((31&a)<<6|63&i),t+=2;else{i=e.charCodeAt(t+1);let n=e.charCodeAt(t+2);r+=String.fromCharCode((15&a)<<12|(63&i)<<6|63&n),t+=3}return r}};