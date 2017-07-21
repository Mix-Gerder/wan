const request = require('ajax-request'),
 			fs = require('fs'),
 			path = require('path'),
 			settings = require('../settings.json');

//HTML var
let temp_main = document.getElementById('template-app').children,
		sites = settings.sites; //Settings

console.log('Wikis: ', sites);

temp_main[0].innerHTML = 'WAN';

function la() {
	setInterval(function(){
    for (let i = 0; i < sites.length; i++) {
  		request({
  			url: 'http://' + sites[i] + '.wikia.com/api.php',
  			method: 'GET',
  			data: {
  				action: 'query',
  				list: 'recentchanges', // <-- this
  				rclimit: '1',
  				rcprop: 'user|title|ids|loginfo|sizes|timestamp|comment',
  				rcshow: '!bot',
  				format: 'json'
  			}
  		}, function (err, res, body) {
  			var re = JSON.parse(body);
  			let arg = re.query.recentchanges[0]

  			fs.exists(`cache-${sites[i]}.json`, (exists) => {
  				if (exists) {
  					fs.readFile(`cache-${sites[i]}.json`, 'utf8', (err, data) => {
  						if (err) {
  							console.log(err)
  						}
  						var jfile = JSON.parse(data)
  						if (JSON.stringify(arg) !== JSON.stringify(jfile)) {
  							d(sites[i],`WAN on ${sites[i]}`,arg);
  							fs.writeFile(`cache-${sites[i]}.json`, JSON.stringify(arg), (err) => {
  								if (err) throw err
  							})
  						}
  					})
  				} else {
  					fs.writeFile(`cache-${sites[i]}.json`, JSON.stringify(arg), (err) => {
  						if (err) throw err;
  						console.log('The file has been saved!');
  					})
  				}
  			})
  		})
    }
	}, 3000)
}

console.log('------\nDone.');
