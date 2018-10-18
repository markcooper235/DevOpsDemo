var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
var start_time = new Date();

//const ip_display_command = "cat ./access.log |awk '{print $1}' |sort |uniq -c |sort -n";
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
                         ip_command_results: stdout.replace("\n","<br>")
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
