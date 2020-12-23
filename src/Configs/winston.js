const approot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] [${label}] ${level}: ${message}`;
  });


const option = {
    file:{ 
        level: 'info',
        filename: `${approot}/logs/src/your-app-logs`,
        handleExceptions: true,
        json: false,
        colorize: true,
        maxsize: 5242213,
        maxFiles: 5,
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
      timestamp(),
      label({ label: 'From Logger Info' }),
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