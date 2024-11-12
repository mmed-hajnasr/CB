const ChatHistory = artifacts.require("ChatHistory");

module.exports = function (deployer) {
  deployer.deploy(ChatHistory);
};
