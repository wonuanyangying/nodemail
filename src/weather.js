const superagent = require('superagent');
const cheerio = require('cheerio');
module.exports = function () {
    return new Promise((resolve) => {
        superagent.get("https://tianqi.moji.com/weather/china/shanghai/pudong-new-district").end((err, res) => {
            let $ = cheerio.load(res.text);
            let weatherTip = "";
            let threeDaysData = [];
            
            $(".wea_tips").each(function(i, elem) {
                weatherTip = $(elem)
                  .find("em")
                  .text();
            });
            $(".forecast .days").each(function(i, elem) {
            const SingleDay = $(elem).find("li");
            threeDaysData.push({
                Day: $(SingleDay[0])
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
                WeatherImgUrl: $(SingleDay[1])
                .find("img")
                .attr("src"),
                WeatherText: $(SingleDay[1])
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
                Temperature: $(SingleDay[2])
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
                WindDirection: $(SingleDay[3])
                .find("em")
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
                WindLevel: $(SingleDay[3])
                .find("b")
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
                Pollution: $(SingleDay[4])
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
                PollutionLevel: $(SingleDay[4])
                .find("strong")
                .attr("class")
            });
            });
            resolve({
                weatherTip,
                threeDaysData
            });
        });
    });  
};