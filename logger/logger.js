const { format, createLogger, transports } = require("winston");
require('dotenv').config();

const { combine, timestamp, label } = format;

const logger = createLogger({
    format: combine(
        label({label: "Log file for Users-products app."}),
        timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "logs/app.log" 
        })
    ]
})

module.exports = logger;