import { actions, Networks } from "../constants";

export const getNetworkAlias = (chainId: number | undefined, setAlias: (alias: string) => void, setRpc: (alias: string) => void, dispatch: any): void => {
    
    for (let i = 0; i < Networks.length; i++) {
        const matched: boolean = Networks[i].id === chainId;
        if (!matched) {
            continue
        }
        if (matched) {
            setAlias(Networks[i].aliasApi)
            setRpc(Networks[i].rpc)
            dispatch({type: actions.setExplorerUrl, payload: Networks[i].explorer})
        }
    }

}