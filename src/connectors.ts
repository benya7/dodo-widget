import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const injected = new InjectedConnector({ supportedChainIds: [1, 56, 128, 137] })

export const walletconnect = new WalletConnectConnector({
    rpc: '',
    qrcode: true,
    pollingInterval: 12000
})