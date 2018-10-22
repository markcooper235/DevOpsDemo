var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
var start_time = new Date();
var externalIPMap = new Map();

const ip_display_command = "cat /var/log/nginx/access.log |awk '{print $1}' |sort |uniq -c |sort -n";

/* GET home page. */
router.get('/', function(req, res, next) {
   var time = process.uptime();
   var uptime = format(time);
   exec(ip_display_command, function (err, stdout, stderr) { 
   if (err) handleError();
   res.render('index', { title: 'My IP List App',
                         start_time: start_time,
                         uptime: uptime,
                         ip_command_results: stdout.replace(/\n/g,"<br>"),
	                 externalIPTable: JSON.stringify(getExternalIPTable(req.headers,externalIPMap))
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
	var header = headers['x-forwarded-for'];
	if(typeof header === "undefined") {
		return "External IP Header Not defined";
	}
	else {
		return header.split(',')[0];
	}
}

function getExternalIPTable(headers, externalIPMap){
	var externalIP = getExternalIP(headers);
	if(typeof externalIP === 'undefined'){
	      externalIP ="undefined";
	}
	if(externalIPMap.has(externalIP)){
		externalIPMap.set(externalIP,externalIPMap[externalIP] + 1);
	}
	else {
		externalIPMap.set(externalIP,1);
	}
	return externalIPMap;
}

