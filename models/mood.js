module.exports = function(sequelize, DataTypes) {
	var Mood = sequelize.define('Mood', {
		name: {
			type: DataTypes.STRING
		},
		date: {
			type: DataTypes.DATE
		}
	}, 
	{
		freezeTableName: true // Model tableName will be the same as the model name
	});
	
	return Mood;
};

