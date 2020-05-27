const puppeteer = require("puppeteer");
const path = require("path");
const helpers = require("./helpers");

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: path.join(__dirname, "ChromeSession"),
  });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/", {
    waitUntil: "networkidle2",
  });

  (await helpers.contactsList(page)).forEach((e, i) =>
    console.log(`${i + 1} - ${e[1]}`)
  );

  let lastLength = 0;
  let blockMessage = true;

  setInterval(async function messageWatcher() {
    const texts = await helpers.getTextFromSelector(
      page,
      '.vW7d1.message-in span[dir="ltr"]'
    );

    const classes = await helpers.getClassListFromLastMessage(page);

    blockMessage =
      classes && classes.findIndex((e) => e === "message-in") !== -1
        ? false
        : true;

    if (texts.length > lastLength && blockMessage === false) {
      await helpers.writeMessage(page, texts.pop()[1]);
    }

    lastLength = texts.length;
  }, 500);
}

main();
