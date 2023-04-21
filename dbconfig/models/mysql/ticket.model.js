const moment = require("moment");
module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      ticket_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      is_basic_economy: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      is_refundable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      base_fare: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      total_fare: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      search_date: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue("search_date")).format("YYYY-MM-DD");
        },
      },
      seat_remaining: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "ticket",
      timestamps: false,
    }
  );
  Ticket.removeAttribute("createdAt");
  Ticket.removeAttribute("updatedAt");
  return Ticket;
};
