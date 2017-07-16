// Close button app
document.getElementById('close-app').onclick = function() {
  window.close();
}

function init() {
  let vt = setInterval(la(),500)
}
document.onload = init()
