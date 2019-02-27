const superagent = require('superagent');
const cheerio = require('cheerio');
module.exports = function () {
    return new Promise((resolve) => {
        superagent.get("http://you.ctrip.com/weather/Newcastleupon1516.html").end((err, res) => {
            let $ = cheerio.load(res.text);
            let weather = [];
            let days = [];
            $('.w_aweek_time li').each((i, elem) => {
                days.push($(elem).text().match(/\（(.+?)\）/g)[0].trim().slice(1,3));
            });
            $(".w_future_forecast li").each(function(i, elem) {
                let temperature = $($(elem).find('.w_future_temp')).text(); //温度
                let types = $(elem).find('.w_future_type');
                let daytime = $($(types)[0]).text(); //白天
                let night = $($(types)[1]).text(); //晚上
                let wind = $($(types)[2]).text(); //风

                weather.push({
                    temperature, daytime, night, wind,
                    date: days[i]
                });
            });
            resolve(weather);
        });
    });  
};