const nodemailer = require('nodemailer');
module.exports = async function (html) {
    let transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secureConnection: true,
        auth: {
            user: '1101544275@qq.com',
            pass: 'qmftboquenymhghj'
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
        subject: "居居哥发来的小邮件",
        html
    };
    let msgW = await transporter.sendMail(mailOptionsWang);
    let msgY = await transporter.sendMail(mailOptionsYang);
    console.log(msgW.messageId, msgY.messageId);
};