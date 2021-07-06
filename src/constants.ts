import { injected, walletconnect } from './connectors';
import { INetwork } from './models';


export const Networks: Array<INetwork> = [
    { id: 1, chainId: '0x1', nameNet: 'Ethereum Mainnet', name: 'Ethereum', rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', symbol: 'ETH', explorer: 'https://etherscan.io'},
    { id: 56, chainId: '0x38', nameNet: 'Binance Smart Chain Mainnet', name: 'Binance', rpc: 'https://bsc-dataseed1.ninicoin.io', symbol: 'BNB', explorer: 'https://bscscan.com/'},
    { id: 128, chainId: '0x80', nameNet: 'Huobi ECO Chain Mainnet', name: 'Heco', rpc: 'https://http-mainnet-node.huobichain.com', symbol: 'HT', explorer: 'https://hecoinfo.com/'},
    { id: 137, chainId: '0x89', nameNet: 'Polygon Mainnet', name: 'Polygon', rpc: 'https://rpc-mainnet.maticvigil.com/', symbol: 'MATIC', explorer: 'https://polygonscan.com'}
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
    }

  };