import { ErrorType, ResponseData, SUPPORTED_WEBSITES, SupportedWebsite, WebIde } from './model';

const extractContractAddressFromEtherscan = (url: string) => {
  const regex = /0x[a-fA-F0-9]+/g;
  const matches = url.match(regex);
  return matches ? matches[0] : null;
};

const getWebIdeUrlForContractAddress = (website: SupportedWebsite, webIde: WebIde, contractAddress: string) => {
  if (webIde === WebIde.DETHCODE) {
    return `https://${website.ide[webIde]}.deth.net/address/${contractAddress}`;
  }

  // add support to more
  return undefined;
};

const isContractPage = (domDocument: Document, website: SupportedWebsite) => {
  // Snowtrace.io - Avalance/Avalance Fuji custom
  // TODO: build enums for chainIds
  if (website.chainId === 43113 || website.chainId === 43114) {
    const elements = domDocument.getElementsByClassName('nav-link break-all');
    for (const el of elements) {
      if ((el as HTMLElement).innerText.toLowerCase() === 'contract') return true;
    }

    // if we have not found it, return false
    return false;
  }

  return domDocument.getElementById('ContentPlaceHolder1_li_contracts') !== null;
};

export const getContractData = (url: string, domDocument: Document, webIde: WebIde): ResponseData => {
  // get the url
  const _url = new URL(url);

  // check if it's one supported by DethCrypto
  const hostname = _url.hostname;

  for (const supportedWebsite of SUPPORTED_WEBSITES) {
    const matched = supportedWebsite.hostnames.includes(hostname);
    if (matched) {
      // check if it's a contract, this is valid only for etherscan websites
      const isContract = isContractPage(domDocument, supportedWebsite);

      // if it's not a contract but we have already matched the website return null early, it won't match anything else
      if (!isContract) {
        return {
          error: ErrorType.SITE_CONTENT_MALFORMED,
        };
      }

      const contractAddress = extractContractAddressFromEtherscan(url);

      // if I can't match the contract address just early return
      // do I need to get the IMPL address if it's a proxy?
      if (!contractAddress) {
        return {
          error: ErrorType.CONTRACT_ADDRESS_CANNOT_PARSE,
        };
      }

      if (!supportedWebsite.ide[webIde]) {
        return {
          error: ErrorType.WEBIDE_NOT_SUPPORTED,
        };
      }

      const webIdeUrl = getWebIdeUrlForContractAddress(supportedWebsite, webIde, contractAddress);

      return {
        data: {
          url: url,
          website: supportedWebsite,
          contract: contractAddress,
          webIdeUrl: webIdeUrl,
        },
      };
    }
  }

  return { error: ErrorType.SITE_NOT_SUPPORTED };
};
