import { injected, walletconnect } from './connectors';
import { INetwork, IWallet } from './models';

export const nativeTokenAdress: string = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
export const slippageToleranceTip: string = 'You transaction will revert if there is an unfavorable change to the price by more than this percentage'
export const minReceivedTip: string = 'You will receive no less than this amount';

export const initialList = [
  {
    id: 526,
    address: '0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd',
    decimals: 18,
    name: 'DODO bird',
    symbol: 'DODO'
  }
]
export const ERC20Abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",

  // Authenticated Functions
  "function approve(address spender, uint amount) returns (boolean)",
  // Events
  "event Approval(address indexed owner, address indexed spender, uint value)"
];
export const actions = {
  setTokenFrom: 'set-token-from',
  setTokenTo: 'set-token-to',
  setAmountFrom: 'set-amount-from',
  setAmountTo: 'set-amount-to',
  setSlippage: 'set-slippage',
  setDeadLine: 'set-deadine',
  setSource: 'set-source',
  setDodoRequest: 'set-dodo-request',
  setTradeRequest: 'set-trade-request',
  setTokenList: 'set-token-list',
  setAvailableReq: 'set-available-request',
  setInitalStore: 'set-initial-store',
  setPricePerFromToken: 'set-price-per-from-token',
  setEqualTokens: 'set-equal-tokens',
  setFetchPriceLoad: 'set-fetch-price-load',
  setExplorerUrl: 'set-explorer-url'
}

export const Networks: Array<INetwork> = [
  {
    id: 1,
    chainId: '0x1',
    nameNet: 'Ethereum Mainnet',
    name: 'Ethereum',
    aliasApi: 'mainnet',
    rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    symbol: 'ETH',
    explorer: 'https://etherscan.io'
  },
  {
    id: 56,
    chainId: '0x38',
    nameNet: 'Binance Smart Chain Mainnet',
    name: 'Binance',
    aliasApi: 'bsc',
    rpc: 'https://bsc-dataseed1.ninicoin.io',
    symbol: 'BNB',
    explorer: 'https://bscscan.com/'
  },
  {
    id: 128,
    chainId: '0x80',
    nameNet: 'Huobi ECO Chain Mainnet',
    name: 'Heco',
    aliasApi: 'heco',
    rpc: 'https://http-mainnet-node.huobichain.com',
    symbol: 'HT',
    explorer: 'https://hecoinfo.com/'
  },
  {
    id: 137,
    chainId: '0x89',
    nameNet: 'Polygon Mainnet',
    name: 'Polygon',
    aliasApi: 'polygon',
    rpc: 'https://rpc-mainnet.maticvigil.com/',
    symbol: 'MATIC',
    explorer: 'https://polygonscan.com'
  }
]


export const Wallets: Array<IWallet> = [
  { name: 'MetaMask', connector: injected, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png' },
  { name: 'WalletConnect', connector: walletconnect, logo: 'https://gblobscdn.gitbook.com/spaces/-LJJeCjcLrr53DcT1Ml7/avatar.png?alt=media' },
]

export const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
    control: {
      border: {
        width: '0px'
      }
    },
    focus: {
      outline: {
        size: '0px'
      }
    }
  },
  layer: {
    border: {
      radius: 'medium',
      intelligentRounding: true,
    },
  },
  checkBox: {
    size: '18px'
  },
  radioButton: {
    size: '18px'
  },
  select: {
    options: {
      container: {
        size: '5px'
      }
    }
  },
  tip: {
    content: {
      background: "dark-4",
      elevation: "none",
      margin: "none",
      pad: "small",
      round: "small"
    }
  },

};