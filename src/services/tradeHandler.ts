import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ERC20Abi } from "../constants";

export const parseAmount = (amountFrom: number, tokenFrom: any): Promise<string> => {
    return new Promise((resolve) => {
        const amount: string = (amountFrom * 10 ** tokenFrom.decimals).toString()
        resolve(amount)

    })
}

export const sendTradeEthBase = async (tradeRequest: any, account: any, signer: JsonRpcSigner): Promise<any> => {
    try {
        const { proxyAddress, requestData, requestValue } = tradeRequest;
        const gas = await signer.estimateGas({
            from: account,
            to: proxyAddress,
            data: requestData,
            value: BigNumber.from(requestValue)
        })
        const result = await signer.sendTransaction({
            from: account,
            to: proxyAddress,
            data: requestData,
            gasLimit: gas,
            value: BigNumber.from(requestValue)
        })
        return result
        
    } catch (error) {
        console.log(error)
    }
}

export const sendTradeTokenBase = async (tokenFrom: any, tradeRequest: any, account: any, signer: JsonRpcSigner): Promise<any> => {
    try {
        if(tokenFrom.address && tradeRequest && account && signer){
            const { targetApprove, proxyAddress, requestData, requestValue } = tradeRequest;
        const erc20 = new Contract(tokenFrom.address, ERC20Abi, signer);
        
        if(targetApprove !=='') {
            await erc20.approve(targetApprove, requestValue)
        }
        
        const gas = await signer.estimateGas({
            from: account,
            to: proxyAddress,
            data: requestData,
        })
        const result = await signer.sendTransaction({
            from: account,
            to: proxyAddress,
            data: requestData,
            gasLimit: gas,
        })
        return result
        }
        
    } catch (error) {
        console.log(error)
    }
}