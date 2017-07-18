const request = require('ajax-request'),
 			fs = require('fs'),
 			path = require('path'),
 			settings = require('../settings.json');

//HTML var
let temp_main = document.getElementById('template-app').children,
		site = settings.wiki;

console.log('Saved: ', site);

temp_main[0].innerHTML = `WAN on ${site}`;

function la() {
	setInterval(function(){
		request({
			url: 'http://' + site + '.wikia.com/api.php',
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

			fs.exists('cache.json', (exists) => {
				if (exists) {
					fs.readFile('cache.json', 'utf8', (err, data) => {
						if (err) {
							console.log(err)
						}
						var jfile = JSON.parse(data)
						if (JSON.stringify(arg) !== JSON.stringify(jfile)) {
							d(`WAN on ${site}`,arg);
							fs.writeFile('cache.json', JSON.stringify(arg), (err) => {
								if (err) throw err
							})
						}
					})
				} else {
					fs.writeFile('cache.json', JSON.stringify(arg), (err) => {
						if (err) throw err;
						console.log('The file has been saved!');
					})
				}
			})
		})
	}, 3000)
}

console.log('------\nDone.');
