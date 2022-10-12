//variables
let codeOutput = document.getElementById("idOutput"),
  logOutput = document.getElementById("logOutput"),
  codeInput = document.getElementById("codeInput")
const evsBtn = document.querySelectorAll(".evsBtn"),
  privateEvsBtn = document.querySelectorAll(".privateEvsBtn")

const logger = (domTarget, message) => {
  domTarget.innerHTML = message
  domTarget.style.display = "block"
  setTimeout(function () {
    logOutput.style.display = "none"
  }, 1200)
}

const system = {
  setVisuals: (transcoded) => {
    logger(codeOutput, transcoded)
    logger(logOutput, `Value Transcoded`)
  },

  setLinks: (transcoded) => {
    system.setPublicLinks(transcoded)
    system.setPrivateLinks()
  },

  setPublicLinks: (transcoded) => {
    evsBtn.forEach((element) => {
      const domains = element.getAttribute("id")
      element.setAttribute("href", `http://${domains}:2113/web/index.html#/streams/Gateway.AlternativeCharge-${transcoded}`)
    })
  },

  setPrivateLinks: () => {
    var selectedApm = document.getElementById("apmSelector").value
    privateEvsBtn.forEach((element) => {
      const domains = element.getAttribute("id")
      element.setAttribute("href", `http://${domains}:2113/web/index.html#/streams/${selectedApm}.Payment-${codeOutput.innerHTML}`)
    })
  },
}

/**
 * Fetch id de-encode result, inserts result into EVS DOM buttons
 * @param {*} request
 */
const getCode = async (request) => {
  let codeValue = document.getElementById("codeInput").value
  if (codeValue == "") {
    logger(logOutput, "Please put an ID")
    return false
  }

  const response = await fetch(`https://devapi.ckotech.co/webhooktester/events/${request}/${codeValue}`, {
    method: "GET",
    redirect: "follow",
  })
  if (response.status != 200) {
    logger(logOutput, `Error: ${response.status}`)
    return false
  }

  const decodedVal = await response.text()
  system.setVisuals(decodedVal)
  if (request === "decode") system.setLinks(decodedVal)
}

//copy to clipboard button
let copyToClip = (append) => {
  const text = append ?? ""
  navigator.clipboard.writeText(text + codeOutput.innerHTML.toString())
  logger(logOutput, "Code Copied to clipboard")
}

//paste from clipboard into id form field
codeInput.addEventListener("click", function () {
  navigator.clipboard.readText().then((clipText) => {
    codeInput.value = ""
    codeInput.value = clipText
  })
})
