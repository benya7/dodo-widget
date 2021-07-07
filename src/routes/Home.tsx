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


const timer = async (ms: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve
        }, ms)
    })
}

const Home = () => {

    const service = useService();
    const dispatch = useDispatch();
    const { account, chainId } = useWeb3React();
    const { tokenTo, tokenFrom, amountFrom, dodoRequest, equalTokens } = useStore();
    const store = useStore();
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
        getNetworkAlias(chainId, setAlias, setRpc)
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
        })
    }, [rpc, alias])

    useEffect(() => {
        if (tokenFrom.symbol !== tokenTo.symbol) {
            dispatch({ type: actions.setEqualTokens, payload: false})
        } else {
            dispatch({ type: actions.setEqualTokens, payload: true})
        }
    }, [tokenTo, tokenFrom])

    useEffect(() => {
        if (equalTokens !== true && tokenFrom.address !== '' && tokenTo.address !== '' && amountFrom > 0) {
            dispatch({ type: actions.setAvailableReq, payload: false })
            getRoute(service, dodoRequest).then((result) => {
                const { resPricePerFromToken, resAmount, targetApproveAddr, to, data } = result

                if (resPricePerFromToken && resAmount && to && data) {
                    dispatch({ type: actions.setPricePerFromToken, payload: resPricePerFromToken })
                    dispatch({ type: actions.setAmountTo, payload: resAmount })
                    dispatch({ type: actions.setTradeRequest, payload: { targetApprove: targetApproveAddr, proxyAddress: to, requestData: data } })
                    dispatch({ type: actions.setAvailableReq, payload: true })
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
