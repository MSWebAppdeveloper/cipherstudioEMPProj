module.exports = (sequelize, DataTypes) => {
    const RulesForCalendar = sequelize.define(
        'RulesForCalendar',
        {
            ruleName: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            graceTime:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            allowedCount:{
                type:DataTypes.INTEGER,
                allowNull: true,
            }

            // deletedAt: {
            //     type: DataTypes.DATE,
            //     allowNull: true,
            // },
        },
        // {
        //     paranoid: true,
        //     timestamps: true,
        
        //   }
    );
    return RulesForCalendar;
}