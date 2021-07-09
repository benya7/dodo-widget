import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ERC20Abi } from "../constants";

export const parseAmount = (amountFrom: number, tokenFrom: any): Promise<string> => {
    return new Promise((resolve) => {
        const amount: string = (amountFrom * 10 ** tokenFrom.decimals).toString()
        resolve(amount)

    })
}

export const sendTradeEthBase = async (tradeRequest: any, account: any, library: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        const signer = library.getSigner()
        signer.sendTransaction({
            from: account,
            to: tradeRequest.proxyAddress,
            data: tradeRequest.requestData,
            value: BigNumber.from(tradeRequest.requestValue)
        }).then((result: any) => {
            resolve(result)
        }).catch((err: any) => {
            reject(err)
        });
    })
}

export const sendTradeTokenBase = async (tokenFrom: any, tradeRequest: any, account: any, library: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        const signer = library.getSigner()
        const { targetApprove, proxyAddress, requestData, requestValue } = tradeRequest;
        const erc20 = new Contract(tokenFrom.address, ERC20Abi, signer);

        if (targetApprove !== '') {
            erc20.approve(targetApprove, requestValue)
                .then((resultApprove: any) => {
                    library.once(resultApprove, () => {
                        signer.sendTransaction({
                            from: account,
                            to: proxyAddress,
                            data: requestData
                        }).then((result: any) => {
                            resolve(result)
                        }).catch((err: any) => {
                            reject(err)
                        })
                    })
                })
                .catch((err: any) => {
                    reject(err)
                })
        }

    })
}