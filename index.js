var request = require('ajax-request');
const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
//Global var
var site;
fs.exists('settings.json', function(exists){ // If settings file exists
  if (exists) {
    fs.readFile('settings.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err)
      }
      var dataConfig = JSON.parse(data)
      var site = dataConfig.wiki
      console.log('Saved: ', site)
      setInterval(function(){
        requestAct(site);
      },5000)
    })
  } else {
    console.error('ERR: Settings file no found!')
    process.exit(1);
  }
});
function requestAct(site) { // Requesting API Info
  request({
    url: 'http://'+site+'.wikia.com/api.php',
    method: 'GET',
    data: {
      action: 'query',
      list: 'recentchanges', // <-- this
      rclimit: '1',
      rcshow: '!bot',
      format: 'json'
    }
  }, function(err, res, body) {
    var re = JSON.parse(body);
    var arg = re.query.recentchanges[0]

    fs.exists('cache.json', function(exists){
      if(exists) {
          fs.readFile('cache.json', 'utf8', function (err,data) {
            if (err) {
              console.log(err);
            }
            var jfile = JSON.parse(data)
            if (JSON.stringify(arg) == JSON.stringify(jfile)) {
            } else {
              var titlePage = arg.title
              notifier.notify({
                'title': 'WAN',
                'message': `${titlePage} was changed.`,
                'icon': path.join(__dirname, 'Wiki.png')
              });
              fs.writeFile('cache.json', JSON.stringify(arg), (err) => {
                if (err) throw err;
              })
            }
          });
        } else {
        fs.writeFile('cache.json', JSON.stringify(arg), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      }
    })
  });
}
console.log('------\nDone.');