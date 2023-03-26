module.exports = (sequelize, Sequelize) => {
    const FlightDetails = sequelize.define("FlightDetails", {
        flight_date: {
            type: Sequelize.DATE,          
            allowNull: false
        },
        travel_duration: {
            type: Sequelize.TIME,          
            allowNull: false
        },
        is_non_stop: {
            type: Sequelize.BOOLEAN,          
            allowNull: false
        },
    },
    {
        tableName: 'flight_details',
        timestamps: false
    }
    );
    FlightDetails.removeAttribute('id');
    FlightDetails.removeAttribute('createdAt');
    FlightDetails.removeAttribute('updatedAt');
    return FlightDetails;
  };