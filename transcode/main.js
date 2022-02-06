//variables
let codeOutput = document.getElementById("idOutput")
let logOutput = document.getElementById("logOutput")
let codeInput = document.getElementById("codeInput")

//logger
let outer = (e, msg) => {
  e.style.display = "block"
  e.innerHTML = msg
  setTimeout(function () {
    logOutput.style.display = "none"
  }, 1200)
}

//engine
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
        }
        return Promise.resolve(response)
      })
      .then((response) => response.text())
      .then((result) => {
        outer(codeOutput, result)
      })
  } catch (error) {
    outer(logOutput, error)
  }
}

//assit ui
let copyToClip = () => {
  navigator.clipboard.writeText(codeOutput.innerHTML.toString())
  outer(logOutput, "ID Copied")
}

//extra
codeInput.addEventListener("click", function () {
  navigator.clipboard.readText().then((clipText) => {
    codeInput.value = ""
    codeInput.value = clipText
  })
})
