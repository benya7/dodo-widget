import { h } from 'preact';
import { Box, Button, Text, Anchor} from "grommet";
import TokenFrom from '../components/PanelTrade/TokenFrom';
import TokenTo from '../components/PanelTrade/TokenTo';
import { useSigner, useStore } from '../hooks';
import { minReceivedTip, nativeTokenAdress, slippageToleranceTip } from '../constants';
import { TipTrade } from '../components/PanelTrade/TipTrade';
import { useWeb3React } from '@web3-react/core';
import { sendTradeEthBase, sendTradeTokenBase } from '../services/tradeHandler';
import { useEffect, useState } from 'preact/hooks';

const PanelTrade = () => {
    const { tokenFrom, tokenTo, amountTo, dodoRequest, fetchPriceLoad, availableReq, tradeRequest, pricePerFromToken, equalTokens, explorerUrl } = useStore()
    const { account } = useWeb3React()
    const signer = useSigner()
    const [hashTx, setHashTx] = useState('0x')
    const [tradeSuccess, setTradeSuccess] = useState(false)
    const [tradeError, setTradeError] = useState(false)
    const [messageError, setMessageError] = useState('')


    useEffect(() => {
        setTimeout(() => {
            setTradeSuccess(false)
        }, 15000);
    }, [hashTx])

    useEffect(() => {
        setTimeout(() => {
            setTradeError(false)
            setMessageError('')
        }, 15000);
    }, [tradeError])

    return (
        <Box pad={{ top: 'small', bottom: 'xsmall', horizontal: 'medium' }} gap='medium'>
            <Box gap='small'>
                <TokenFrom />
                <TokenTo />
            </Box>
            <Box align='center' gap='small'>
                {pricePerFromToken && equalTokens !== true && (
                    <Text size='small'>
                        1 {tokenFrom.symbol} = {pricePerFromToken} {tokenTo.symbol}
                    </Text>
                )}
                {fetchPriceLoad &&
                    <Box background='dark-3' pad={{ vertical: 'xsmall', horizontal: 'small' }} round='small' aling='center' justify='center'>
                        <Text size='xsmall'>
                            fetching data prices..
                        </Text>
                    </Box>
                }

                <Button label='Confirm Order' disabled={!availableReq ? true : false} onClick={() => {
                    if (tokenFrom !== '' && tokenFrom === nativeTokenAdress && signer) {
                        sendTradeEthBase(tradeRequest, account, signer).then((result) => {
                            setHashTx(result.hash)
                            setTradeSuccess(true)
                        })
                            .catch((error) => {
                                setTradeError(true)
                                setMessageError(error)
                            })
                    }

                    if (tokenFrom !== '' && tokenFrom !== nativeTokenAdress && signer) {
                        sendTradeTokenBase(tokenFrom, tradeRequest, account, signer).then((result) => {
                            setHashTx(result.hash)
                            setTradeSuccess(true)
                        })
                            .catch((error) => {
                                setTradeError(true)
                                setMessageError(error.toString())
                            })
                    }

                }} />
            </Box>
            {account && availableReq &&
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
                            <Text textAlign='end' size='small' > {amountTo}</Text>
                        </Text>
                    </Box>
                </Box>
            }
            {tradeSuccess &&
                <Box>
                    <Text>The swap was successful!</Text>
                    <Anchor href={`${explorerUrl}/tx/${hashTx}`} label={hashTx} target='_blank'/>
                </Box>
            }
            {messageError &&
                <Box>
                    <Text>Ha ocurrido un error!</Text>
                    <Text>{messageError}</Text>
                </Box>
            }
        </Box>
    )
}
export default PanelTrade;