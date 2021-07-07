import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import ModalConnect from '../components/ModalConnect';
import { Box, Button } from 'grommet';
import PanelTrade from '../components/PanelTrade';
import { useDispatch, useStore, useService } from '../hooks';
import { actions } from '../constants';

import { DodoRequest } from '../models';
import { useWeb3React } from '@web3-react/core';
import { getListTokens } from '../services/getListTokens';
import { getNetworkAlias } from '../services/getNetworkAlias';
import { getRoute } from '../services/getRoute';
const Home = () => {

    const service = useService();
    const dispatch = useDispatch();
    const { account, chainId } = useWeb3React();
    const { tokenTo, tokenFrom, amountFrom, amountTo, dodoRequest, tokenList } = useStore();
    const store = useStore();
    const [alias, setAlias] = useState<string | null>(null)
    const [rpc, setRpc] = useState<string | null>(null)
    const amount: string = (amountFrom * 10 ** tokenFrom.decimals).toString()
    useEffect(() => {
        
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
    }, [tokenTo, tokenFrom, amount, account, chainId])

    useEffect(() => {
        console.log(store)
        
    }, [store])

    useEffect(() => {
        getNetworkAlias(chainId, setAlias, setRpc)
    }, [chainId])

    useEffect(() => {
        if (!account) {
            return
        }
        dispatch({ type: actions.setDodoRequest, payload: { rpc: rpc }})
        getListTokens(alias).then((tokens) => {
            dispatch({
                type: actions.setTokenList,
                payload: tokens
            })
        })
    }, [rpc, alias])


    useEffect(() => {
        if(
            tokenFrom.address !== '' &&
            tokenTo.address !== '' &&
            amountFrom !== 0 &&
            amountFrom !== 1
        ) {
            getRoute(service, dodoRequest).then((data) => {
                dispatch({
                    type: actions.setTradeRequest, payload: {
                        targetApprove: data.targetApproveAddr,
                        proxyAddress: data.to,
                        requestData: data.data
                    }
                })
                dispatch({
                    type: actions.setAmountTo, payload: data.resAmount
                }
                )
            })
        } else {
            return
        }
    }, [tokenTo, tokenFrom, account, chainId])

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
