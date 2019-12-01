var 
 r = require('tiny_request'),
 config = require('./config'),
 telegram = require('./telegram.js'),
 money = 0;

var lk = {
	check : async () =>{
		let respons = await curl(`https://market.csgo.com/api/v2/get-money?key=${config.market_csg.token}`);
		money = Number(respons.money)
		if (Number(respons.money)<80) telegram.send_msg(`⛔️ Заканчивается Баланс: ${respons.money} Пополнить: https://market.csgo.com/checkin/`);
		if (Number(respons.money)>money) telegram.send_msg(`✅ Пополнение баланса: ${respons.money}`);
	},
	getRandomInt : (min,max) => {
		var timer = Math.floor(Math.random() * (max - min)) + min;
		return timer;
	}
};





setInterval(function () {
	lk.check();
}, lk.getRandomInt(90000,180000));//3-5 минут



function curl(url) {
    return new Promise((resolve, reject) => {
        r.get({ url: url, timeout: 15000 }, (body, res, err) => {
            if (!err && res.statusCode == 200) resolve(JSON.parse(body));
            else resolve(res);
        });
    });
}