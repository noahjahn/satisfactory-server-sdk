export enum Colors {
  Red = '\x1b[31m',
  Yellow = '\x1b[33m',
}

const logger = {
  error: (message: string | unknown) => {
    console.error(`${Colors.Red}ERROR:`, message);
  },
  warn: (message: string | unknown) => {
    console.warn(`${Colors.Yellow}WARNING:`, message);
  },
  log: (message: string | unknown) => {
    console.log(message);
  },
  debug: (message: string | unknown) => {
    console.log(`DEBUG:`, message);
  },
};

export default logger;
