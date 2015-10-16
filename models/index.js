var express = require('express')
	, app = express()
	, config = require('../config/config.json')[process.argv[3]];


if (!global.hasOwnProperty('db')) {
	var Sequelize = require('sequelize');
	
	var sequelize = new Sequelize(config.database, config.username, config.password, { 
		dialect:  'mysql',
		protocol: 'mysql',
		host: config.host,
		logging:  true //false
	});
	
	global.db = {
	    Sequelize: 		Sequelize,
	    sequelize: 		sequelize,
	    User: sequelize.import(__dirname + '/user'),
	    Mood: sequelize.import(__dirname + '/mood')
	};
	
	global.db.Mood.belongsTo(global.db.User, {onDelete: 'CASCADE'});
}

module.exports = global.db;
