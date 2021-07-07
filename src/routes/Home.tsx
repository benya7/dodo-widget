import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import ModalConnect from '../layout/ModalConnect';
import { Box } from 'grommet';
import PanelTrade from '../layout/PanelTrade';
import { useDispatch, useStore, useService } from '../hooks';
import { actions } from '../constants';
import { useWeb3React } from '@web3-react/core';
import { getListTokens } from '../services/getListTokens';
import { getNetworkAlias } from '../services/getNetworkAlias';
import { getRoute } from '../services/getRoute';
import { parseAmount } from '../services/tradeHandler';

const Home = () => {

    const service = useService();
    const dispatch = useDispatch();
    const { account, chainId } = useWeb3React();
    const { tokenTo, tokenFrom, amountFrom, dodoRequest, equalTokens } = useStore();
    const [alias, setAlias] = useState<string | null>(null)
    const [rpc, setRpc] = useState<string | null>(null)

    useEffect(() => {
        parseAmount(amountFrom, tokenFrom).then((amount) => {
            dispatch({
                type: actions.setDodoRequest,
                payload: {
                    fromTokenAddress: tokenFrom.address,
                    fromTokenDecimals: tokenFrom.decimals,
                    toTokenAddress: tokenTo.address,
                    toTokenDecimals: tokenTo.decimals,
                    fromAmount: amount,
                    userAddr: account,
                    chainId: chainId

                }
            })
            dispatch({
                type: actions.setTradeRequest, payload: {
                    requestValue: amount
                }
            })
        })

    }, [tokenTo, tokenFrom, amountFrom, account, chainId])

    useEffect(() => {
        getNetworkAlias(chainId, setAlias, setRpc, dispatch)
    }, [chainId])

    useEffect(() => {
        if (!account) {
            return
        }
        dispatch({ type: actions.setDodoRequest, payload: { rpc: rpc } })
        getListTokens(alias).then((tokens) => {
            dispatch({
                type: actions.setTokenList,
                payload: tokens
            })
        }).catch((error) => {
            console.log(error)
            dispatch({
                type: actions.setTokenList,
                payload: []
            })
            getListTokens(alias).then((tokens) => {
                dispatch({
                    type: actions.setTokenList,
                    payload: tokens
                })
            }).catch(() => {
                return
            })
        })
    }, [rpc, alias])

    useEffect(() => {
        if (tokenFrom.symbol !== tokenTo.symbol) {
            dispatch({ type: actions.setEqualTokens, payload: false})
        } else {
            dispatch({ type: actions.setEqualTokens, payload: true})
            dispatch({ type: actions.setAvailableReq, payload: false })
        }
    }, [tokenTo, tokenFrom])

    useEffect(() => {
        if (equalTokens !== true && tokenFrom.address !== '' && tokenTo.address !== '' && amountFrom > 0) {
            dispatch({ type: actions.setAvailableReq, payload: false })
            dispatch({ type: actions.setFetchPriceLoad, payload: true })
            getRoute(service, dodoRequest).then((result) => {
                
                const { resPricePerFromToken, resAmount, targetApproveAddr, to, data } = result

                if (resPricePerFromToken && resAmount && to && data) {
                    dispatch({ type: actions.setPricePerFromToken, payload: resPricePerFromToken })
                    dispatch({ type: actions.setAmountTo, payload: resAmount })
                    dispatch({ type: actions.setTradeRequest, payload: { targetApprove: targetApproveAddr, proxyAddress: to, requestData: data } })
                    dispatch({ type: actions.setAvailableReq, payload: true })
                    dispatch({ type: actions.setFetchPriceLoad, payload: false })
                }

            }).catch((error) => {
                dispatch({ type: actions.setAmountTo, payload: null })
            })
        }
    }, [tokenFrom, dodoRequest, account, chainId])

    return (
        <Box>
            <Box direction='row' gap='small' alignSelf='end' pad='small'>
                <ModalConnect />
            </Box>
            <PanelTrade />
        </Box>

    );
};

export default Home;
