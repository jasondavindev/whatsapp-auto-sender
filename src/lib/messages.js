const selectors = require("./selectors");

const writeMessage = async (page, message) => {
  await page.waitForSelector("._2S1VP", { visible: true });
  await page.keyboard.type(message);
  await page.click("._35EW6");
};

exports.writeMessage = writeMessage;

exports.messageWatcher = (page, browser) => {
  let blockMessage = true;

  return async function watcher() {
    let texts;

    try {
      texts = await selectors.getTextFromSelector(
        page,
        '.vW7d1.message-in span[dir="ltr"]'
      );
    } catch (error) {
      await browser.close();
      console.error(error.message);
      console.log("Closing process");
      process.exit(1);
    }

    const classList = await selectors.getClassListOfLastMessage(page);

    blockMessage =
      classList && classList.findIndex((e) => e === "message-in") !== -1
        ? false
        : true;

    if (!blockMessage) {
      await writeMessage(page, texts.pop()[1]);
      blockMessage = true;
    }
  };
};
