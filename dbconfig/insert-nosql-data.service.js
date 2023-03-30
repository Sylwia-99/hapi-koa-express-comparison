const fs = require("fs");
const {parse}  = require("csv-parse");
const MOMENT = require('moment');

function FormatMe(n) {
    return (n<10) ? '0'+n : n.toString();
}

exports.insertData = async (Ticket) => {
    try {
        const start = new Date()
      fs.createReadStream("C:/Users/Dawid/Desktop/sylwia/Studia/PracaMagisterska/archive/itineraries.csv")
      .pipe(parse({from_line: 2, to_line:5}))
      .on('data', async function (data) {
        const splitDate = data[6].split("PT")[1];
        const splitHours = FormatMe(parseFloat(splitDate?.split("H")[0]));
        const splitMinutes = FormatMe(parseFloat(splitDate?.split("H")[1]?.split("M")[0]));
          const ticket = {
            is_basic_economy: data[8] === 'True' ? 1: 0,
            is_refundable: data[9] === 'True' ? 1: 0,
            base_fare: data[11],
            total_fare: data[12],
            search_date:  new Date(data[1]),
            seat_remaining: data[13],
            flight: {
              flight_details: {
                flight_date: new Date(data[2]),
                travel_duration: `${splitHours}:${splitMinutes}:00`,
                is_non_stop: data[10] === 'True' ? 1: 0, 
              },
              plane:{
                segments_equipment_description: data[23], 
                airline: {
                  segments_airline_name: data[21], 
                  segments_airline_code: data[22]
                }
              },
              starting_airport: {
                airport_name: data[3]
              }, 
              destination_airport: {
                airport_name: data[4]
              }
            }
          }
  
        const newRecord = await new Ticket(ticket)
        await newRecord.save()
            .then(data => {
              // console.log(data);   
            })
  
       })  
      .on("end", function () {
        console.log("finished");
        const TimeDiff = ( startTime, endTime ) => {
            startTime = MOMENT( startTime, 'hh:mm:ss a');
            endTime = MOMENT(endTime,'hh:mm:ss a');
            return MOMENT.duration(endTime.diff(startTime)).asSeconds();
        }
        
        const stop = new Date()
        console.log(start, stop)
        console.log( TimeDiff(start, stop), 'seconds');
      })
      .on("error", function (error) {
        console.log(error.message);
      });
    }
    catch(err) {
          console.log(err)
        };
  };
  