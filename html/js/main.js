const {shell} = require('electron');

// Close button app
document.getElementById('close-app').onclick = function() {
  window.close();
}

document.getElementById('l__link-diff').onclick = function(event) {
  event.preventDefault();
  if (this.getAttribute('href') != '#') {
    shell.openExternal(this.getAttribute('href'));
  }
}

function init() {
  la()
}
document.onload = init()
