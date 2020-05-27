exports.getClassListOfLastMessage = (page) => {
  return page.$$eval(".vW7d1", (elements) =>
    elements.map((e) => [...e.classList]).pop()
  );
};

exports.getTextFromSelector = async (page, selector) => {
  return page.$$eval(selector, (elements) =>
    elements.map((e, i) => [i, e.textContent])
  );
};
