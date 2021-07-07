
import { useWeb3React } from '@web3-react/core';
import { ServiceContext, TradeContext } from './AppContext';
import { useContext, useState, useEffect } from 'preact/hooks';
import { JsonRpcSigner } from '@ethersproject/providers';

export const useService = (): any => useContext(ServiceContext);
export const useStore = (): any => useContext(TradeContext)[0]
export const useDispatch = (): any => useContext(TradeContext)[1]

export const useSigner = () => {
    const { library } = useWeb3React()
    const [signer, setSigner] = useState<JsonRpcSigner>()
    useEffect(() => {
        if(!library) {
            return
        }
        let _signer = library.getSigner()
        setSigner(_signer)
    }, [library])

    return signer
}
