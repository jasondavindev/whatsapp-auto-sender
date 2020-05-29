const { EventEmitter } = require("events");

const messageEmmiter = new EventEmitter({ captureRejections: true });

exports.messageEmmiter = messageEmmiter;

exports.writeMessage = async (page, message) => {
  await page.waitForSelector("._2S1VP", { visible: true });
  await page.keyboard.type(message);
  await page.click("._35EW6");
};

exports.listenMessages = () => {
  const messageContainer = document.querySelector("._9tCEa");

  const watcher = new MutationObserver((mutations) => {
    const container = mutations
      .filter((mutation) => mutation.target === messageContainer)
      .pop();

    if (!container) return;

    const message = [...container.addedNodes]
      .filter((node) => [...node.classList].includes("vW7d1"))
      .pop();

    if (!message) return;

    const messageType = [...message.classList].includes("message-in")
      ? "in"
      : "out";

    const messageText = message.querySelector('span[dir="ltr"]').textContent;
    console.log(
      messageType,
      JSON.stringify({
        message: messageText,
        time: Date.now(),
      })
    );

    window.onMessage({
      type: `message-${messageType}`,
      message: messageText,
      time: Date.now(),
    });
  });

  watcher.observe(messageContainer, {
    subtree: true,
    childList: true,
  });
};
