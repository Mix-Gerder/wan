const {shell} = require('electron');

// Close button app
document.getElementById('close-app').onclick = function() {
  window.close();
}

document.getElementById('btn-add-wiki').onclick = function() {
  openCustomModal('Add a wiki', 'addWikiModal')
}

function openCustomModal(t,b) {
  let xt = document.getElementById('customModal');
  xt.style.display = 'block';

  let window_t = document.getElementById('customModal-window').getElementsByTagName('*');
  window_t[0].innerHTML = t;
  if (b == 'addWikiModal') {
    let nodeText = 'Type the domain of the target wiki (ex: in case of http://mlp.wikia.com just use "mlp")<br/>\
    <input name="add-wiki_textarea"/><br/>\
    <button id="btn-close-customModal">Cancel</button> <button id="btn-add-elwiki-list">Add Wiki!</button>';
    window_t[1].innerHTML = nodeText;
    document.getElementById('btn-add-elwiki-list').onclick = function() {
      if (document.getElementsByName('add-wiki_textarea')[0].value != '') {
        sites.push(document.getElementsByName('add-wiki_textarea')[0].value);
        addWiki(document.getElementsByName('add-wiki_textarea')[0].value);
        for (var i = 0; i < window_t.length; i++) {
          window_t[i].innerHTML = '';
        }
        xt.style.display = 'none';
      }
    }
    document.getElementById('btn-close-customModal').onclick = function() {
      for (var i = 0; i < window_t.length; i++) {
        window_t[i].innerHTML = '';
      }
      xt.style.display = 'none';
    }
  }

}

function removeWiki(w) {
  // Removing from list
  ul_wikis = document.getElementById('wikis-list');
  ul_wikis.removeChild(ul_wikis.children[w]);
  // Removing from array
  for (var i = 0; i < sites.length; i++) {
    if (sites[i] === w) {
      sites.splice(i,1);
      break
    }
  }
}

function addWiki(w) {
  // ehh...
  let site_temp = document.createElement('li'),
      t__btn_rmv = document.createElement('button'),
      t__dom_name = document.createElement('div'),
      t__title = document.createElement('h3'),
      t__author = document.createElement('div'),
      t__summary = document.createElement('div'),
      t__timestamp = document.createElement('div'),
      t__link_diff = document.createElement('a');

  // Ready for append.
  document.getElementById('wikis-list').appendChild(site_temp).setAttribute('id',w);
  rt = document.getElementById(w);
  rt.setAttribute('class','la')
  // ID appends
  rt.appendChild(t__btn_rmv).setAttribute('id','l__btn_rmv')
  rt.appendChild(t__dom_name).setAttribute('id','l__dom_name')
  rt.appendChild(t__title).setAttribute('id','l__title')
  rt.appendChild(t__author).setAttribute('id','l__author')
  rt.appendChild(t__summary).setAttribute('id','l__summary')
  rt.appendChild(t__timestamp).setAttribute('id','l__timestamp')
  rt.appendChild(t__link_diff).setAttribute('id','l__link-diff')
  // Append domain name
  rt.getElementsByTagName('*')[1].innerHTML = w
  // Append icon remove
  rt.getElementsByTagName('*')[0].innerHTML = '<i class="material-icons">close</i>'
  // Fetch color link (theme wiki)
  fetch_theme_wiki(w)
  // Remove button
  rt.getElementsByTagName('*')[0].onclick = function() {
    removeWiki(w)
    console.log(w+' was removed.')
  }
  // Diff link
  rt.getElementsByTagName('*')[6].onclick = function(event) {
    event.preventDefault();
    if (this.getAttribute('href') != '#') {
      shell.openExternal(this.getAttribute('href'));
    }
  }
}

function init() {
  for (var w = 0; w < settings.sites.length; w++) {
    addWiki(settings.sites[w])
  }
  la() // Last Activity Function
}
document.onload = init()
