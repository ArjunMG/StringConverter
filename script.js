// to set an update interval at every 2 sec(2000ms)
// var callAPI = (inputString, inputType) => {
//     console.log(inputString +':' +inputType)
//     let url = "https://l8dbng5792.execute-api.us-east-1.amazonaws.com/dev"; // test url
//     // assuming data is json, if it is text use response.text()
//     var myHeaders = new Headers();
//     // add content type header to object
//     myHeaders.append("Content-Type", "application/json");
//     // using built in JSON utility package turn object to string and store in a variable
//     var raw = JSON.stringify({"inputString": inputString, "inputType": inputType});

//     console.log(raw);

//     // create a JSON object with parameters for API call and store in a variable
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     fetch(url, requestOptions)
//     .then(response => response.text())
//     .then(result => {
//         // parsing the JSON value to string
//         let resp = JSON.parse(result);
//         console.log(resp);
        
//         document.getElementById("hexString").value = resp.hexString;
//         document.getElementById("asciiString").value = resp.asciiString;
//         document.getElementById("decString").value = resp.decimalString;
//         document.getElementById("base64String").value = resp.base64String;
//     })
//     .catch(error => console.log('error', error));
// }

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos ) {
    // && currentScrollPos < 100
    document.getElementById("top-bar").style.top = "0";
  } else {
    document.getElementById("top-bar").style.top = "-200px";
  }
  prevScrollpos = currentScrollPos;
}