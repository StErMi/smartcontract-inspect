import { MessageType, WebIde } from './model';
import { getContractData } from './utils';

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === MessageType.FETCH_ETHERSCAN_MESSAGE) {
    const webIdeData = getContractData(document.URL, document, WebIde.DETHCODE);
    sendResponse(webIdeData);
  }
});
