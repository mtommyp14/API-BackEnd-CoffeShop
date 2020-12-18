const approot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });


const option = {
    file:{ 
        level: 'info',
        filename: `${approot}/logs/src/your-app-logs`,
        // format: format.combine(format.simple(), format.json()),
        format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },

    console:{
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
}


const logger = createLogger({
    format: combine(
      label({ label: 'From Logger Info' }),
      timestamp(),
      myFormat
    ),
    transports: [
        new transports.File(option.file), 
        new transports.Console(option.console)
    ],
    exitOnError: false,
  });

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
}

module.exports = logger