const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const ejs = require('ejs');
const getOne = require('./one');
const sendEmail = require('./send');
const getWeather = require('./weather');

const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, "email.ejs"), 'utf8')
);

schedule.scheduleJob('0 0 8 * * *', () => {
    let htmlData = {};
    Promise.all([getWeather(), getOne()]).then((data) => {
        let today = new Date(),
            initDay = new Date('2018/12/06'),
            lastDay = Math.floor((today - initDay) / 1000 / 60 / 60 / 24),
            todaystr = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`;
        const weather = data[0];
        const todayOneData = data[1];
        htmlData = {
            weatherTip: weather.weatherTip,
            threeDaysData: weather.threeDaysData,
            lastDay,
            todaystr,
            todayOneData
        };
        const html = template(htmlData);
        sendEmail(html);
    });    
});
