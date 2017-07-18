const msg = require('../i18n.json'),
      notifier = require('node-notifier');

let la_title = document.getElementById('l__title'),
    la_author = document.getElementById('l__author'),
    la_summary = document.getElementById('l__summary'),
    la_timestamp = document.getElementById('l__timestamp'),
    la_diff_link = document.getElementById('l__link-diff'),
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
      timestamp__j = j.timestamp.split('-')[2].split('T')[1].substr(0,8)
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
  la_title.innerHTML = `${target} ${mf__w} ${mf__ba}`,
  la_author.innerHTML = `${mf__b} ${usr}`;
  if (j.comment) {
    mf__x += ` | ${j.comment}`;
    la_summary.innerHTML = j.comment
  } else {
    la_summary.innerHTML = 'Summary no found!'
  }
  la_timestamp.innerHTML = `${timestamp__j} (UTC)`
  if (j__t == 'edit') {
    let current_revid = j.revid,
        old_revid = j.old_revid,
        mf__dl = msg[prefered_lang].misc.diff_link
    la_diff_link.innerHTML = `${mf__dl} ${target} // ${current_revid}`;
    la_diff_link.setAttribute('href', `http://${site}.wikia.com/${target}?diff=${current_revid}&oldid=${old_revid}`);
  } else {
    la_diff_link.innerHTML = '';
    la_diff_link.setAttribute('href', '#');
  }
  n(tl, mf__x);
}

function n(tl, ms) {
  notifier.notify({
		'title': tl,
		'message': ms
	});
}
