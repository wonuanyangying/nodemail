const nodemailer = require('nodemailer');
const fs = require('fs');
module.exports = async function (html) {
    let transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secureConnection: true,
        auth: {
            user: '1101544275@qq.com',
            pass: 'iqkipqvkyzepigjc'
        }
    });
    let mailOptionsWang = {
        from: '"居居哥" <1101544275@qq.com>',
        to: "wangtianli02@meituan.com",
        subject: "居居哥发来的小邮件",
        html
    };
    let mailOptionsYang = {
        from: '"居居哥" <1101544275@qq.com>',
        to: "yangying861@outlook.com",
        subject: "居居哥发来的新版小邮件",
        html
    };
    let msgW = await transporter.sendMail(mailOptionsWang);
        msgW = JSON.stringify(msgW, null, '\t');
    let msgY = await transporter.sendMail(mailOptionsYang);
        msgY = JSON.stringify(msgY, null, '\t');
    let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    fs.writeFileSync('./log.txt', `\n 当前日期: ${date} --> ${msgW} ${msgY}`, {
        encoding: 'utf8',
        flag: 'a'
    });
};