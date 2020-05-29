const { EventEmitter } = require("events");

const messageEmmiter = new EventEmitter({ captureRejections: true });

exports.messageEmmiter = messageEmmiter;

exports.writeMessage = async (page, message) => {
  await page.waitForSelector("._2S1VP", { visible: true });
  await page.keyboard.type(message);
  await page.click("._35EW6");
};

// Client side function
exports.listenMessages = (elements) => {
  window.pupLib = {};

  elements.forEach((element) => {
    element.addEventListener("click", () => {
      window.pupLib.watcher && window.pupLib.watcher.disconnect();
      window.pupLib.messageContainer = document.querySelector("._9tCEa");

      window.pupLib.watcher = new MutationObserver((mutations) => {
        const container = mutations
          .filter(
            (mutation) => mutation.target === window.pupLib.messageContainer
          )
          .pop();

        if (!container) return;

        const message = [...container.addedNodes]
          .filter((node) => [...node.classList].includes("vW7d1"))
          .pop();

        if (!message) return;

        const messageType = [...message.classList].includes("message-in")
          ? "message-in"
          : "message-out";

        const messageText = message.querySelector('span[dir="ltr"]')
          .textContent;

        window.onMessage({
          type: messageType,
          message: messageText,
          time: Date.now(),
        });
      });

      window.pupLib.watcher.observe(window.pupLib.messageContainer, {
        subtree: true,
        childList: true,
      });
    });
  });
};
