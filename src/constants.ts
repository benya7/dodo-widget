import { injected, walletconnect } from './connectors';
import { INetwork } from './models';

export const Networks: Array<INetwork> = [
    { chainId: 1, nameNet: 'Ethereum Mainnet', name: 'Ethereum', rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', symbol: 'ETH', explorer: 'https://etherscan.io'},
    { chainId: 56, nameNet: 'Binance Smart Chain Mainnet', name: 'Binance', rpc: 'https://bsc-dataseed1.ninicoin.io', symbol: 'BNB', explorer: 'https://bscscan.com/'},
    { chainId: 128, nameNet: 'Huobi ECO Chain Mainnet', name: 'Heco', rpc: 'https://http-mainnet-node.huobichain.com', symbol: 'HT', explorer: 'https://hecoinfo.com/'},
    { chainId: 137, nameNet: 'Polygon Mainnet', name: 'Polygon', rpc: 'https://rpc-mainnet.maticvigil.com/', symbol: 'MATIC', explorer: 'https://polygonscan.com'}
  ]


export const Wallets: Array<{name: string, connector: any, logo: string}> = [
  {name: 'MetaMask', connector: injected, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png'},
  {name: 'WalletConnect', connector: walletconnect, logo: 'https://gblobscdn.gitbook.com/spaces/-LJJeCjcLrr53DcT1Ml7/avatar.png?alt=media'},
]
export const theme = {
    global: {
      font: {
        family: 'Roboto',
        size: '14px',
        height: '20px',
      },
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
    }
  };