var formidable = require('formidable')
;

module.exports = {
	setup: function(req, res) {
		var users = [];
		db.User.findOrCreate({where: {email: 'navyabraju@gmail.com'}}).spread(function(user1, created) {
			users[0] = {email: user1.email, created: created};
			db.User.findOrCreate({where: {email: 'princiya777@gmail.com'}}).spread(function(user2, created) {
				users[1] = {email: user2.email, created: created};
				res.send(users);
			}).catch(function(err) {
				res.send(err);
			});
		}).catch(function(err) {
			res.send(err);
		});
	},
	
	capture: function(req, res) {
		res.render('capture');
	},
	
	logMood: function(req ,res) {
		var form = new formidable.IncomingForm()
			, moods = '';
		;
		form.parse(req, function(err, fields, files) {
	      if(err) return jsonOutput.send(res, 400, err);
	      else {
	    	  mood = fields.mood;
	      }
		});
		
		form.on('end', function(fields, files) {
			db.Mood.create({name: mood, UserId: 1}).then(function(mood) {
				res.send(mood);
			}).catch(function(err) {
				res.send(err);
			});
		});
	},
	
	showGauge: function(req, res) {
		res.render('showGauge', {val: req.param('val')});
	},
	
	getMoodPercent: function(req, res) {
		db.Mood.count().then(function(moods) {
			db.Mood.count({where: {name: 'happy'}}).then(function(happiness) {
				res.json(happiness/moods * 100);
			}).catch(function(err) {
				res.send(err);
			});
		}).catch(function(err) {
			res.send(err);
		});
	}
};
  