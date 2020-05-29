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

  await page.exposeFunction("onMessage", ({ type, message, time }) => {
    messages.messageEmmiter.emit(type, { message, time });
  });
  await page.evaluate(messages.listenMessages);

  messages.messageEmmiter.on("message-in", ({ message, time }) => {
    console.log(`[${new Date(time).toISOString()}](in) ${message}`);
  });

  messages.messageEmmiter.on("message-out", ({ message, time }) => {
    console.log(`[${new Date(time).toISOString()}](out) ${message}`);
  });
}

main();
