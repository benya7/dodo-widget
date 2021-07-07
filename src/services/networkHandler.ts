import { Networks } from "../constants";
import { IRequestParams } from "../models";

export const getParams = (chainId: number, target: string): IRequestParams | void => {
    let params: IRequestParams;

    for (let index = 0; index < Networks.length; index++) {
        const matched: boolean = Networks[index].name === target;

        if (!matched) {
            continue
        }
        if (matched) {
            const chainEqualTarget: boolean = Networks[index].id === chainId;
            if (!chainEqualTarget) {
                params = [{
                    chainId: Networks[index].chainId,
                    blockExplorerUrls: [Networks[index].explorer],
                    chainName: Networks[index].nameNet,
                    nativeCurrency: {
                        name: Networks[index].name,
                        symbol: Networks[index].symbol,
                        decimals: 18
                    },
                    rpcUrls: [Networks[index].rpc]
                }]

                return params

            } else {
                return
            }
        }

    }


}
export const switchChain = async (params: IRequestParams, library: any): Promise<void> => {
    try {
        const param = params[0].chainId;
        await library.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: param }]
        })
    } catch (error) {
        try {
            if (error.code === 4902) {
                await library.provider.request({
                    method: 'wallet_addEthereumChain',
                    params,
                })
            } else {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
}