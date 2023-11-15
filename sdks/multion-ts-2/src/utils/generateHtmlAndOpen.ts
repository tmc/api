import { writeFileSync } from 'fs';

export const generateHtmlAndOpen = async (screenshotDataUrl: string) => {
  // Create HTML content
  const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Screenshot</title>
      </head>
      <body>
          <img src="${screenshotDataUrl}" alt="Screenshot">
      </body>
      </html>
    `;

  // Save HTML content to a file
  const filePath = 'screenshot.html';
  writeFileSync(filePath, htmlContent);
  
  const open = (await import('open')).default;
  // Open HTML file in the default web browser
  await open(filePath);
};
