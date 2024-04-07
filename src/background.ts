import { ErrorType, MessageType, ResponseData } from './model';

const triggerErrorNotification = (error: ErrorType) => {
  let message = '';
  if (error === ErrorType.UNKNOWN) {
    message = 'Unknown error while processing website';
  } else if (error === ErrorType.SITE_NOT_SUPPORTED) {
    message = 'Etherscan/website not supported';
  } else if (error === ErrorType.SITE_CONTENT_MALFORMED) {
    message = 'Website is for EOA or contract cannot be found';
  } else if (error === ErrorType.WEBIDE_NOT_SUPPORTED) {
    message = 'Selected WebIDE not supported for this website';
  } else {
    // error === ErrorType.CONTRACT_ADDRESS_CANNOT_PARSE
    message = 'Contract address cannot be parsed from URL';
  }

  const options = {
    type: 'basic',
    title: 'Error',
    message: message,
    iconUrl: '../icon128.png',
  };
  chrome.notifications.create(options);
};

chrome.runtime.onInstalled.addListener(() => {
  console.log('chrome.runtime.onInstalled');
});

chrome.action.onClicked.addListener(async (tab) => {
  if (tab && tab.id) {
    chrome.tabs.sendMessage(tab.id, { text: MessageType.FETCH_ETHERSCAN_MESSAGE }, function (response: ResponseData) {
      if (response.error) {
        triggerErrorNotification(response.error);
      } else {
        if (response.data && response.data.webIdeUrl) {
          chrome.tabs.create({ url: response.data.webIdeUrl });
        } else {
          triggerErrorNotification(ErrorType.UNKNOWN);
        }
      }
    });
  }
});
