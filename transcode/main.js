//variables
let codeOutput = document.getElementById("idOutput")
let logOutput = document.getElementById("logOutput")
let codeInput = document.getElementById("codeInput")

//logger
let outer = (e, msg) => {
  e.style.display = 'block'
  e.innerHTML = msg
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
      .then((response) => response.text())
      .then((result) => {
        outer(codeOutput, result)
      })
      .catch((error) => {
        throw error
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

//extra: wip this permission attack
codeInput.addEventListener("click", function () {
  navigator.clipboard.readText().then(
    clipText => {
      codeInput.value = ''
      codeInput.value = clipText
    });
})

//hide log output
window.addEventListener("load", function () {
  setInterval(function () {
    logOutput.style.display = "none"
  }, 1500)
})
