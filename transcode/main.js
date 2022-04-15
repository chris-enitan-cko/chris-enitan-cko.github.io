//variables
let codeOutput = document.getElementById("idOutput")
let logOutput = document.getElementById("logOutput")
let codeInput = document.getElementById("codeInput")
const evsBtn = document.querySelectorAll(".evsBtn")

/**
 * Prints and displays a string msg into a node e then hides node after 1200ms
 * @param {*} e
 * @param {*} msg
 */
let outer = (e, msg) => {
  e.style.display = "block"
  e.innerHTML = msg
  setTimeout(function () {
    logOutput.style.display = "none"
  }, 1200)
}

/**
 * Fetch id de-encode result, inserts result into EVS DOM buttons
 * @param {*} e
 */
let dance = (e) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  }
  let codeValue = document.getElementById("codeInput").value
  //sanitisation
  try {
    if (codeValue == "") {
      throw "Please put an id"
    }
    fetch(`https://devapi.ckotech.co/webhooktester/events/${e}/${codeValue}`, requestOptions)
      .then((response) => {
        if (response.status != 200) {
          outer(logOutput, `Error: ${response.status}`)
          return Promise.reject(response)
        }
        return Promise.resolve(response)
      })
      .then((response) => response.text())
      .then((result) => {
        outer(codeOutput, result)
        //append evs links to decoded id
        if (e === "decode") {
          for (let i = 0; i < evsBtn.length; i++) {
            const id = evsBtn[i].getAttribute("id")
            evsBtn[i].setAttribute(
              "href",
              `http://${id}:2113/web/index.html#/streams/Gateway.AlternativeCharge-${result}`
            )
          }
        }
      })
      .catch((error) => {
        console.log(error)
        outer(logOutput, `Error: ${error.status}`)
      })
  } catch (error) {
    outer(logOutput, error)
  }
}

//copy to clipboard button
let copyToClip = () => {
  navigator.clipboard.writeText(codeOutput.innerHTML.toString())
  outer(logOutput, "Code Copied to clipboard")
}

//paste from clipboard into id form field
codeInput.addEventListener("click", function () {
  navigator.clipboard.readText().then((clipText) => {
    codeInput.value = ""
    codeInput.value = clipText
  })
})
