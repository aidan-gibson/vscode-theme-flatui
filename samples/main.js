var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var iconv = require('iconv-lite');

console.log('Start......');

var pageUrl = function (num) {
	return "http://www.qk365.com/list/p" + num;
}

var output = function (err, res) {
	var $ = cheerio.load(res.text);
}

var rstData = '';
var writeInfo = function (text) {
	rstData += "\r\n" + text;
	//console.log(text);
}

var pageParse = function (url, callback) {
	superagent
		.get(url)
		.end(function (err, res) {
			if (err) {
				console.log(err);
				return callback(err);
			}

			var $ = cheerio.load(res.text);

			var getText = function (ele) {
				return $(ele).text().trim();
			}

			var pageRst = ''
			$('ul.easyList > li').each(function (index, element) {
				var place = $(element).find(".coverBox > .fL > i > a");
				var price = $(element).find(".coverBox > .fR > b");
				var addr = $(element).find(".easyCon > .easyBottomInfo > a");
				var info = getText(place) + "," + getText(price) + "," + getText(addr) + "\r\n";

				pageRst += info;
			});

			callback(null, pageRst);

			// $('ul.easyList > li > a').each(function (index, element) {
			// 	superagent.get(element.href).end(output);
			// });
		});
}

var count = 30;
var pageList = [];
for (let i = 0; i < count; i++) {
	pageList[i] = pageUrl(i) + 1;
}

function generate() {
	async.mapLimit(pageList, 10, pageParse, function (err, results) {
		var rst = '';
		for (let i = 0; i < count; i++) {
			rst += results[i];
		}

		fs.writeFile('1.csv', iconv.encode(rst, 'gbk'), null, function (err) {
			console.log("finished");
		});
	});
}

generate();
