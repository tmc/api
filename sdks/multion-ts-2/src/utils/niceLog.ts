const Colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
};

export const niceLog = (
  title: string,
  message: any,
  dividerChar?: string,
  error?: boolean,
) => {
  if (dividerChar?.length !== 1) {
    dividerChar = '=';
  }
  const dividerLength = title.length > 6 ? title.length : 6;
  console.log(
    `${Colors.Bright}${Colors.FgGreen}\n${title}\n\n${dividerChar.repeat(
      dividerLength,
    )}\n${Colors.Reset}`,
  );

  message =
    typeof message !== 'object' || message instanceof Error
      ? message
      : JSON.stringify(message, null, 2) || message;

  // Check if the message is an Error
  if (message instanceof Error || error) {
    console.log(`${Colors.FgRed}${message.stack || message}${Colors.Reset}`);
  } else {
    console.log(message);
  }

  console.log(
    `\n${Colors.Bright}${Colors.FgGreen}${dividerChar.repeat(dividerLength)}${
      Colors.Reset
    }\n`,
  );
};
