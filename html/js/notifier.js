const msg = require('../i18n.json'),
      notifier = require('node-notifier');

let la_title = document.getElementById('l__title'),
    la_author = document.getElementById('l__author'),
    prefered_lang = settings.lang;

if (!msg[prefered_lang]) {
    console.log(`${prefered_lang} no found, traslated to "en" (English).`);
    prefered_lang = 'en';
}

function d(tl, j) {
  let j__t = j.type,
      mf__x = '',
      mf__a = '',
      mf__w = msg[prefered_lang].misc.was,
      mf__b = msg[prefered_lang].misc.by,
      mf__ba = '',
      usr = j.user,
      target = j.title;
  if (j__t == 'log') {
      let j__lax = j.logaction,
          j__lty = j.logtype;
      mf__a += msg[prefered_lang].type[j__t].action[j__lty][j__lax];
      mf__ba += msg[prefered_lang].misc.was_sentences[j__t].action[j__lty][j__lax];
  } else {
    mf__a += msg[prefered_lang].type[j__t];
    mf__ba += msg[prefered_lang].misc.was_sentences[j__t];
  }
  mf__x += `${usr} ${mf__a} ${target}`;
  if (j.comment) {
    mf__x += ` | ${j.comment}`;
  }
  la_title.innerHTML = `${target} ${mf__w} ${mf__ba}`,
  la_author.innerHTML = `${mf__b} ${usr}`;
  n(tl, mf__x);
}

function n(tl, ms) {
  notifier.notify({
		'title': tl,
		'message': ms
	});
}
