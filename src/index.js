const puppeteer = require("puppeteer");
const path = require("path");
const { contacts, messages } = require("./lib");

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: path.join(__dirname, "ChromeSession"),
  });

  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/", {
    waitUntil: "networkidle2",
  });

  const contact = await contacts.showContactsMenu(page);
  await contacts.selectContact(page, contact);

  setInterval(messages.messageWatcher(page, browser), 500);
}

main();
