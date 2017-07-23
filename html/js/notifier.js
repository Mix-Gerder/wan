const msg = require('../i18n.json'),
      notifier = require('node-notifier');

let prefered_lang = settings.config.lang;

if (!msg[prefered_lang]) {
    console.log(`${prefered_lang} no found, traslated to "en" (English).`);
    prefered_lang = 'en';
}

function d(s, tl, j) {
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
  //inner HTML

  let tr = document.getElementById(s).getElementsByTagName('*');
  // Tags
  let la_title = tr[3],
      la_author = tr[4],
      la_summary = tr[5],
      la_timestamp = tr[6],
      la_diff_link = tr[7];

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
    la_diff_link.setAttribute('href', `http://${s}.wikia.com/${target}?diff=${current_revid}&oldid=${old_revid}`);
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
