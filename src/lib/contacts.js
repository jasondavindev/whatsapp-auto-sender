const menu = require("console-menu");

exports.contactsList = async (page) => {
  await page.waitForSelector("._2wP_Y", { visible: true });

  return page.$$eval("._2wP_Y", (elements) =>
    elements.map((e) => e.querySelector("._25Ooe").textContent)
  );
};

const createMenuItems = (contacts) =>
  contacts.map((contact, index) => ({
    hotkey: (index + 1).toString(),
    title: contact,
    index,
  }));

exports.showContactsMenu = async (page) => {
  const contacts = await this.contactsList(page);
  const items = createMenuItems(contacts);
  const menuInput = await menu(items, {
    header: "Select contact",
    border: true,
  });

  return menuInput;
};

exports.selectContact = async (page, contact) => {
  const elements = await page.$$("._2wP_Y");
  const contactElement = elements.filter((e, i) => i === contact.index).shift();
  return contactElement.click();
};
