module.exports.getClassListFromLastMessage = (page) => {
  return page.$$eval(".vW7d1", (elements) =>
    elements.map((e) => [...e.classList]).pop()
  );
};

module.exports.getTextFromSelector = async (page, selector) => {
  return page.$$eval(selector, (elements) =>
    elements.map((e, i) => [i, e.textContent])
  );
};

module.exports.writeMessage = async (page, message) => {
  // click on the first contact
  // await page.waitForSelector("._2wP_Y", { visible: true });
  // await page.click("._2wP_Y");
  await page.waitForSelector("._2S1VP", { visible: true });
  await page.keyboard.type(message);
  await page.click("._35EW6");
};
