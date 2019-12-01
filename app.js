var 
 r = require('tiny_request'),
 config = require('./config'),
 telegram = require('./telegram.js');


var lk = {
	check : async () =>{
		let respons = await curl(`https://market.csgo.com/api/v2/get-money?key=${config.market_csg.token}`);
		console.log(respons);
		if (Number(respons.money)<80) telegram.send_msg(`⛔️ Заканчивается Баланс: ${respons.money}`);
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