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
  await page.waitForSelector("._2S1VP", { visible: true });
  await page.keyboard.type(message);
  await page.click("._35EW6");
};

module.exports.contactsList = async (page) => {
  await page.waitForSelector("._2wP_Y", { visible: true });

  return page.$$eval("._2wP_Y", (elements) =>
    elements
      .map((e) => [
        parseInt(/translateY\((\d+)px\)/gi.exec(e.getAttribute("style"))[1]),
        e.querySelector("._25Ooe").textContent,
      ])
      .sort((a, b) => a[0] - b[0])
  );
};
