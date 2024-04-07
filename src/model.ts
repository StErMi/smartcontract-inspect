export enum MessageType {
  FETCH_ETHERSCAN_MESSAGE = 'FETCH_ETHERSCAN_MESSAGE',
}

export enum ErrorType {
  UNKNOWN,
  // etherscan not found / site not supported by DethCode
  SITE_NOT_SUPPORTED,
  // cannot find the HTML element to understand if it's a contract or an EOA
  SITE_CONTENT_MALFORMED,
  // selected webide (DethCode, etc) not supported
  WEBIDE_NOT_SUPPORTED,
  // contract address cannot be parsed from url
  CONTRACT_ADDRESS_CANNOT_PARSE,
}

export enum WebIde {
  DETHCODE = 'dethcode',
}

export interface ResponseData {
  data?: ContractData;
  error?: ErrorType;
}

export interface ContractData {
  url: string;
  website: SupportedWebsite;
  contract: string;
  webIdeUrl?: string;
}

export interface SupportedWebsite {
  chainId: number;
  name: string;
  hostnames: string[];
  ide: { [key in WebIde]?: string };
}

export enum Network {
  ETHEREUM_MAINNET = 'ethereum-mainnet',
}

export const SUPPORTED_WEBSITES: SupportedWebsite[] = [
  {
    chainId: 1,
    name: 'Ethereum Mainnet',
    hostnames: ['etherscan.io', 'etherscan.com'],
    ide: { dethcode: 'etherscan' },
  },
  {
    chainId: 11155111,
    name: 'Ethereum Sepolia Testnet',
    hostnames: ['sepolia.etherscan.io'],
    ide: { dethcode: 'sepolia.etherscan' },
  },
  {
    chainId: 17000,
    name: 'Ethereum Holesky Testnet',
    hostnames: ['holesky.etherscan.io'],
    ide: { dethcode: 'holesky.etherscan' },
  },
  {
    chainId: 56,
    name: 'Binance Smart Chain',
    hostnames: ['bscscan.com'],
    ide: { dethcode: 'bscscan' },
  },
  {
    chainId: 97,
    name: 'Binance Smart Chain Testnet',
    hostnames: ['testnet.bscscan.com'],
    ide: { dethcode: 'testnet.bscscan' },
  },
  {
    chainId: 250,
    name: 'Fantom',
    hostnames: ['ftmscan.com'],
    ide: { dethcode: 'ftmscan' },
  },
  {
    chainId: 4002,
    name: 'Fantom Testnet',
    hostnames: ['testnet.ftmscan.com'],
    ide: { dethcode: 'testnet.ftmscan' },
  },
  {
    chainId: 10,
    name: 'Optimism',
    hostnames: ['optimistic.etherscan.io'],
    ide: { dethcode: 'optimistic.etherscan' },
  },
  {
    chainId: 11155420,
    name: 'Optimism Sepolia Testnet',
    hostnames: ['sepolia-optimistic.etherscan.io'],
    ide: { dethcode: 'sepolia-optimistic.etherscan' },
  },
  {
    chainId: 137,
    name: 'Polygon',
    hostnames: ['polygonscan.com'],
    ide: { dethcode: 'polygonscan' },
  },
  {
    chainId: 8001,
    name: 'Polygon Mumbai Testnet',
    hostnames: ['mumbai.polygonscan.com'],
    ide: { dethcode: 'testnet.polygonscan' },
  },
  {
    chainId: 42161,
    name: 'Arbitrum',
    hostnames: ['arbiscan.io'],
    ide: { dethcode: 'arbiscan' },
  },
  {
    chainId: 421614,
    name: 'Arbitrum Sepolia Testnet',
    hostnames: ['sepolia.arbiscan.io'],
    ide: { dethcode: 'sepolia.arbiscan' },
  },
  {
    chainId: 43114,
    name: 'Avalance',
    hostnames: ['snowtrace.io'],
    ide: { dethcode: 'snowtrace' },
  },
  {
    chainId: 43113,
    name: 'Avalance Fuji Testnet',
    hostnames: ['testnet.snowtrace.io'],
    ide: { dethcode: 'testnet.snowtrace' },
  },
  {
    chainId: 25,
    name: 'Cronos Mainnet',
    hostnames: ['cronoscan.com'],
    ide: { dethcode: 'cronoscan' },
  },
  {
    chainId: 8453,
    name: 'Base',
    hostnames: ['basescan.org'],
    ide: { dethcode: 'basescan' },
  },
  {
    chainId: 84532,
    name: 'Base Sepolia Testnet',
    hostnames: ['sepolia.basescan.org'],
    ide: { dethcode: 'sepolia.basescan' },
  },
  {
    chainId: 252,
    name: 'Fraxtal',
    hostnames: ['fraxscan.com'],
    ide: { dethcode: 'fraxscan' },
  },
  {
    chainId: 2522,
    name: 'Fraxtal Holesky Testnet',
    hostnames: ['holesky.fraxscan.com'],
    ide: { dethcode: 'holesky.fraxscan' },
  },
  {
    chainId: 238,
    name: 'Blast',
    hostnames: ['blastscan.io'],
    ide: { dethcode: 'blastscan' },
  },
  {
    chainId: 168587773,
    name: 'Blast Sepolia Testnet',
    hostnames: ['sepolia.blastscan.io'],
    ide: { dethcode: 'sepolia.blastscan' },
  },
];
