import { h } from 'preact';
import { Box, Button, Text, Spinner } from "grommet";
import TokenFrom from '../components/PanelTrade/TokenFrom';
import TokenTo from '../components/PanelTrade/TokenTo';
import { useSigner, useStore } from '../hooks';
import { minReceivedTip, nativeTokenAdress, slippageToleranceTip } from '../constants';
import { TipTrade } from '../components/PanelTrade/TipTrade';
import { useWeb3React } from '@web3-react/core';
import { sendTradeEthBase, sendTradeTokenBase } from '../services/tradeHandler';

const PanelTrade = () => {
    const { tokenFrom, amountTo, amountFrom, dodoRequest, availableReq, tradeRequest } = useStore()
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
                    {!availableReq && amountFrom > 0 ? <Spinner size='1px' /> : <Text textAlign='end' size='small' > {amountTo}</Text>}
                    </Text>
                </Box>

            </Box>
        </Box>
    )
}
export default PanelTrade;