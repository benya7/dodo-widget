import { h } from 'preact';
import { Box, Button, Text, Anchor, Paragraph } from "grommet";
import TokenFrom from '../components/PanelTrade/TokenFrom';
import TokenTo from '../components/PanelTrade/TokenTo';
import { useDispatch, useStore } from '../hooks';
import { actions, minReceivedTip, nativeTokenAdress, slippageToleranceTip } from '../constants';
import { TipTrade } from '../components/PanelTrade/TipTrade';
import { useWeb3React } from '@web3-react/core';
import { sendTradeEthBase, sendTradeTokenBase } from '../services/tradeHandler';
import { useEffect, useState } from 'preact/hooks';

const PanelTrade = () => {
    const { tokenFrom, tokenTo, amountTo, dodoRequest, fetchPriceLoad, availableReq, tradeRequest, pricePerFromToken, equalTokens, explorerUrl } = useStore()
    const { account, library } = useWeb3React()
    const web3 = useWeb3React()
    const [hashTx, setHashTx] = useState('0x')
    const [tradeSuccess, setTradeSuccess] = useState(false)
    const [tradeError, setTradeError] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [requesting, setRequesting] = useState(false)
    const [fromEqualNative, setFromEqualNative] = useState(false)
    const dispatch = useDispatch()

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

    useEffect(() => {
        if (tokenFrom.address !== nativeTokenAdress) {
            setFromEqualNative(false)
            return
        } else {
            setFromEqualNative(true)
        }
    }, [tokenFrom])

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

                <Box fill pad={{ horizontal: 'xsmall' }}>
                    <Button primary fill label='Confirm' disabled={availableReq && !requesting ? false : true} onClick={() => {
                        setRequesting(true)
                        let signer = library.getSigner()

                        if (fromEqualNative) {
                            dispatch({ type: actions.setAvailableReq, payload: false })
                            sendTradeEthBase(tradeRequest, account, signer).then((result: any) => {
                                setHashTx(result.hash)
                                setTradeSuccess(true)
                                setRequesting(false)
                            }).catch((error: any) => {
                                setTradeError(true)
                                setMessageError(error.message)
                                setRequesting(false)
                            })
                        }

                        if (tokenFrom !== '' && !fromEqualNative) {
                            sendTradeTokenBase(tokenFrom, tradeRequest, account, signer)
                                .then((result) => {
                                    let _hash = `${result.hash.substring(0, 9)}...${result.hash.substring(result.hash.length - 8)}`
                                    setHashTx(_hash)
                                    setTradeSuccess(true)
                                    setRequesting(false)
                                }).catch((error) => {
                                    setTradeError(true)
                                    setMessageError(error.message)
                                    setRequesting(false)
                                })
                        }
                    }} />
                </Box>
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
                <Box align='center' justify='center' width='400px'>
                    <Text size='small'>The swap was successful!</Text>
                    <Paragraph>
                        <Anchor size='small' href={`${explorerUrl}/tx/${hashTx}`} label={hashTx} target='_blank' />
                    </Paragraph>

                </Box>
            }
            {messageError &&
                <Box align='center' justify='center' width='400px'>
                    <Text size='small'>An error has occurred!</Text>
                    <Paragraph size='small'>{messageError}</Paragraph>
                </Box>
            }
        </Box>
    )
}
export default PanelTrade;