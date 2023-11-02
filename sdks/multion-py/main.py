# Example of anon sdk usage
import asyncio
import anon
import time
import os
from anon.client import Client

from playwright.async_api import async_playwright

API_KEY = "ory_st_CVLmTJHwTjt5DsmkT7UHZhWf1LwWDVuU"
APP_USER_ID = "d7273277-820e-4211-8e6a-686190a63f87"
SESSION_DOMAIN = "uber"
SESSION_APP_URL = "https://m.uber.com/"

async def main():
    client = Client(API_KEY)

    # Request a session for a user
    account = anon.Account(APP_USER_ID, SESSION_DOMAIN)
    print("requesting session")
    await client.request_session(account)

    # Wait for the user to create the session
    while True:
        print("Polling for session...")
        try:
            session = await client.get_session(account)
            print("Got session")
            break
        except Exception as e:  
            print(e)
            time.sleep(3)

    # Use the session in Playwright!
    async with async_playwright() as p:
        # Set headless to True to hide the browser window
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page, ctx = await anon.inject_playwright(SESSION_APP_URL, context, session)

        # Take actions as the user
        # Send a message on LinkedIn!
        # recipient = "Div Garg"
        # # current time in hh:mm:ss format
        # time_string = time.strftime('%H:%M:%S')
        # message = "hello from Anon! :)" + " The time is " + time_string
        # print("Sending message '", message, "' to", recipient)

        # await page.goto("https://linkedin.com/messaging/?")
        # await page.main_frame.wait_for_load_state()
        # await page.get_by_placeholder("Search messages").press_sequentially(recipient)
        # await page.wait_for_timeout(1000)
        # await page.get_by_placeholder("Search messages").press("Enter")
        # await page.wait_for_timeout(1000)

        # await page.get_by_role("listitem").filter(has_text=recipient, has_not=page.locator("#ember")).first.click()
        # await page.wait_for_timeout(1000)

        # await page.get_by_label("Write a message").press_sequentially(message)
        # await page.wait_for_timeout(1000)
        
        # await page.get_by_role("button", name="Send", exact=True).click()

        # Optional wait period for actions to complete
        await asyncio.sleep(100000)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())