module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		firstName: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
				/*notEmpty: {
					msg: "Please enter a valid email addresss"
				}*/
			}
		},
		password: {
			type: DataTypes.TEXT
		},
		phone: {
			type: DataTypes.STRING
		},
		isActive: {
			type: DataTypes.BOOLEAN
		},
		picUrl: {
			type: DataTypes.STRING //profile pic location
		}
	}, 
	{
		freezeTableName: true // Model tableName will be the same as the model name
	});
	
	return User;
};

