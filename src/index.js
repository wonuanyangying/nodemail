const fs = require('fs');
const path = require('path');
const Koa = require('Koa');
const schedule = require('node-schedule');
const ejs = require('ejs');
const getOne = require('./one');
const sendEmail = require('./send');
const getWeather = require('./weather');

const app = new Koa();
let htmlData = {};

let today = new Date(),
    initDay = new Date('2018/12/06'),
    lastDay = Math.floor((today - initDay) / 1000 / 60 / 60 / 24),
    todaystr = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`;

htmlData = {
    lastDay,
    todaystr
};

const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, "email.ejs"), 'utf8')
);

schedule.scheduleJob('0 0 16 * * *', () => {
    Promise.all([getWeather(), getOne()]).then((data) => {
        const weather = data[0];
        const todayOneData = data[1];
        htmlData = {
            weather,
            threeDaysData: [
                {
                    Temperature: '11',
                    Day: '今天',
                    WeatherText: '晴'
                }
            ],
            todayOneData,
            ...htmlData
        };
        const html = template(htmlData);
        // app.use(ctx => {
        //     ctx.body = html;
        // });
        // app.listen(8080);
        sendEmail(html);
    });    
});
