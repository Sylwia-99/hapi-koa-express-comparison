const fs = require("fs");
const { parse } = require("csv-parse");

function FormatMe(n) {
  if (n === NaN) n = 0;
  return n < 10 ? "0" + n : n.toString();
}

exports.insertData = async (
  Ticket,
  FlightDetails,
  Flight,
  Airport,
  Plane,
  Airline
) => {
  try {
    fs.createReadStream(
      "C:/Users/Dawid/Desktop/sylwia/Studia/PracaMagisterska/archive/itineraries.csv"
    )
      .pipe(parse({ from_line: 2, to_line: 500002 }))
      .on("data", async function (data) {
        const splitDate = data[6].split("PT")[1];
        let splitHours = FormatMe(parseFloat(splitDate?.split("H")[0]));
        let splitMinutes = FormatMe(
          parseFloat(splitDate?.split("H")[1]?.split("M")[0])
        );
        if (splitHours === "NaN") {
          splitHours = "00";
        }

        if (splitMinutes === "NaN") {
          splitMinutes = "00";
        }
        const airline = await Airline.findOrCreate({
          where: {
            segments_airline_name: data[21],
            segments_airline_code: data[22],
          },
        });

        const plane = await Plane.findOrCreate({
          where: {
            airline_id: airline[0].dataValues.airline_id,
            segments_equipment_description: data[23],
          },
        });

        const starting_airport = await Airport.findOrCreate({
          where: {
            airport_name: data[3],
          },
        });

        const destination_airport = await Airport.findOrCreate({
          where: {
            airport_name: data[4],
          },
        });

        const flight = await Flight.findOrCreate({
          where: {
            plane_id: plane[0].dataValues.plane_id,
            starting_airport_id: starting_airport[0].dataValues.airport_id,
            destination_airport_id:
              destination_airport[0].dataValues.airport_id,
          },
        });

        const flightDetails = await FlightDetails.findOrCreate({
          where: {
            fk_flight_id: flight[0].dataValues.flight_id,
            flight_date: data[2],
            travel_duration: `${splitHours}:${splitMinutes}:00`,
            is_non_stop: data[10] === "True" ? 1 : 0,
          },
        });

        const ticket = {
          flight_id: flightDetails[0].dataValues.fk_flight_id,
          is_basic_economy: data[8] === "True" ? 1 : 0,
          is_refundable: data[9] === "True" ? 1 : 0,
          base_fare: data[11],
          total_fare: data[12],
          search_date: data[1],
          seat_remaining: data[13],
        };

        const newRecord = await new Ticket(ticket);
        await newRecord.save().then((data) => {
          console.log(data);
        });
      })
      .on("end", function () {
        console.log("finished");
      })
      .on("error", function (error) {
        console.log(error.message);
      });
  } catch (err) {
    console.log(err);
  }
};
