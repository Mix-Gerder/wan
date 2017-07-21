const {shell} = require('electron');

// Close button app
document.getElementById('close-app').onclick = function() {
  window.close();
}


function init() {
  for (var w = 0; w < settings.sites.length; w++) {
    // ehh...
    let site_temp = document.createElement('li'),
        t__dom_name = document.createElement('div'),
        t__title = document.createElement('h3'),
        t__author = document.createElement('div'),
        t__summary = document.createElement('div'),
        t__timestamp = document.createElement('div'),
        t__link_diff = document.createElement('a');

    // Ready for append.
    document.getElementById('wikis-list').appendChild(site_temp).setAttribute('id',settings.sites[w]);
    rt = document.getElementById(settings.sites[w]);
    rt.setAttribute('class','la')
    //ID appends
    rt.appendChild(t__dom_name).setAttribute('id','l__dom_name')
    rt.appendChild(t__title).setAttribute('id','l__title')
    rt.appendChild(t__author).setAttribute('id','l__author')
    rt.appendChild(t__summary).setAttribute('id','l__summary')
    rt.appendChild(t__timestamp).setAttribute('id','l__timestamp')
    rt.appendChild(t__link_diff).setAttribute('id','l__link-diff')
    //Append domain name
    rt.getElementsByTagName('*')[0].innerHTML = settings.sites[w]
    // Diff link
    document.getElementById('l__link-diff').onclick = function(event) {
      event.preventDefault();
      if (this.getAttribute('href') != '#') {
        shell.openExternal(this.getAttribute('href'));
      }
    }
  }
  la() // Last Activity Function
}
document.onload = init()
