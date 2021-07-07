import { h } from 'preact';
import { Box, Button, Text } from "grommet";
import TokenFrom from './TokenFrom';
import TokenTo from './TokenTo';
import { useEffect, useState } from 'preact/hooks';
import { useSigner, useStore } from '../hooks';
import { ERC20Abi, minReceivedTip, nativeTokenAdress, slippageToleranceTip } from '../constants';
import { TipTrade } from './TipTrade';
import { JsonRpcSigner, TransactionResponse } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';


const sendTradeEthBase = async (tradeRequest: any, account: any, signer: JsonRpcSigner): Promise<any> => {
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

const sendTradeTokenBase = async (tokenFrom: any, tradeRequest: any, account: any, signer: JsonRpcSigner): Promise<any> => {
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

const PanelTrade = () => {
    const { tokenFrom, amountTo, dodoRequest, availableReq, tradeRequest } = useStore()
    const { account } = useWeb3React()
    const signer = useSigner()

    return (
        <Box pad={{ top: 'small', bottom: 'xsmall', horizontal: 'medium' }} gap='medium'>
            <Box gap='small'>
                <TokenFrom />
                <TokenTo />
            </Box>
            <Box align='center' gap='small'>
                <Text size='small'>
                    1 ETH = 2554.545544 USDC
                </Text>
                <Text size='small'>
                    fetching bests prices
                </Text>

                <Button label='Confirm Order' disabled={!availableReq ? true : false} onClick={() => {
                    if(tokenFrom !== '' && tokenFrom === nativeTokenAdress && signer) {
                        sendTradeEthBase(tradeRequest, account, signer).then((result) => {
                            console.log(result)
                        })
                    }


                    if (tokenFrom !== '' && tokenFrom !== nativeTokenAdress && signer) {
                        sendTradeTokenBase(tokenFrom, tradeRequest, account, signer).then((result) => {
                            console.log(result)
                        })
                    }

                }}/>
            </Box>
            <Box gap='small'>
                <Box direction='row' justify='between'>

                    <Box direction='row' justify='around' align='center' gap='xxsmall'>
                        <Text size='small'>
                            Slippage Tolerance:
                        </Text>
                        <TipTrade text={slippageToleranceTip} />
                    </Box>
                    <Text size='small'>
                        {dodoRequest.slippage}%
                    </Text>
                </Box>
                <Box direction='row' justify='between'>

                    <Box direction='row' justify='around' align='center' gap='xxsmall'>
                        <Text size='small'>
                            Minimun Received:
                        </Text>
                        <TipTrade text={minReceivedTip} />
                    </Box>
                    <Text size='small'>
                        {amountTo}
                    </Text>
                </Box>

            </Box>
        </Box>
    )
}
export default PanelTrade;