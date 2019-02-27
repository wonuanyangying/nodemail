const superagent = require('superagent');
const cheerio = require('cheerio');
module.exports = function () {
    return new Promise(function(resolve,reject){
        superagent.get('http://wufazhuce.com').end(function(err, res) {
            if (err) {
                reject(err);
            }
            let $ = cheerio.load(res.text);
            let selectItem = $("#carousel-one .carousel-inner .item");
            let todayOne = selectItem[0];
            let todayOneData = {
                imgUrl: $(todayOne)
                    .find(".fp-one-imagen")
                    .attr("src"),
                type: $(todayOne)
                    .find(".fp-one-imagen-footer")
                    .text()
                    .replace(/(^\s*)|(\s*$)/g, ""),
                text: $(todayOne)
                    .find(".fp-one-cita")
                    .text()
                    .replace(/(^\s*)|(\s*$)/g, "")
            };
            resolve(todayOneData)
        });
    });
}