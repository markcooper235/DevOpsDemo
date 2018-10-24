var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
var start_time = new Date();
externalIPMap = {};

const ip_display_command = "cat /var/log/nginx/access.log |awk '{print $1}' |sort |uniq -c |sort -n";

/* GET home page. */
router.get('/', function(req, res, next) {
   var time = process.uptime();
   var uptime = format(time);
   var externalIP = getExternalIP(req.headers);
   exec(ip_display_command, function (err, stdout, stderr) { 
   if (err) handleError();
   res.render('index', { title: 'My IP List App',
                         start_time: start_time,
                         uptime: uptime,
                         ip_command_results: stdout.replace(/\n/g,"<br>"),
	                 externalIP: externalIP,
	   		 externalIPTable: JSON.stringify(getExternalIPTable(externalIP,externalIPMap),null,4)
                       });
   }); 
});

module.exports = router;

function format(seconds){
	          function pad(s){
			       return (s < 10 ? '0' : '') + s;
			   }
	          var hours = Math.floor(seconds / (60*60));
	          var minutes = Math.floor(seconds % (60*60) / 60);
	          var seconds = Math.floor(seconds % 60);

	          return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function getExternalIP(headers){
	if('x-forwarded-for' in headers){
		var header = headers['x-forwarded-for'];
		return header.split(',')[0];
	}
	return "undefined"
}

function getExternalIPTable(externalIP,externalIPMap){
	if(externalIP == "undefined"){console.log("undefined") }
	else if (externalIP in externalIPMap){
		externalIPMap[externalIP] = externalIPMap[externalIP] + 1;
	}
	else {
		externalIPMap[externalIP] = 1;
	}
	console.log(JSON.stringify(externalIPMap));
	return externalIPMap;
}

