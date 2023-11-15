import { Multion } from './multion';
import { generateHtmlAndOpen } from './utils/generateHtmlAndOpen';
import { niceLog } from './utils/niceLog';

const main = async () => {
  const multion = new Multion({ verbose: true });
  await multion.login();

  let response = await multion.newSession({
    input: 'what is the weather today',
    url: 'https://www.google.com',
  });
  niceLog('Test - Response 1', response);

  let tabId = response.tabId;

  response = await multion.updateSession(tabId, {
    input: 'what is the weather today',
    url: 'https://www.google.com',
  });
  niceLog('Test - Response 2', response);
  let screenshotDataUrl = await multion.getScreenshot(response, 800);

  // Generate HTML and open it in the browser
  await generateHtmlAndOpen(screenshotDataUrl);

  await multion.closeSession(tabId);
};

main();
