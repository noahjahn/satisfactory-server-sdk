export enum Colors {
  Reset = '\x1b[0m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
}

const logger = {
  error: (message: string | unknown) => {
    console.error(`${Colors.Red}ERROR:`, message, `${Colors.Reset}`);
  },
  warn: (message: string | unknown) => {
    console.warn(`${Colors.Yellow}WARNING:`, message, `${Colors.Reset}`);
  },
  log: (message: string | unknown) => {
    console.log(message);
  },
  debug: (message: string | unknown) => {
    console.log(`DEBUG:`, message);
  },
  success: (message: string | unknown) => {
    console.log(`${Colors.Green}\u2713`, message, `${Colors.Reset}`);
  },
};

export default logger;
