import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import ModalConnect from '../components/ModalConnect';
import { Box, Button } from 'grommet';
import PanelTrade from '../components/PanelTrade';
import { useDispatch, useStore, useService } from '../hooks';
import { actions, Networks } from '../constants';

import { DodoRequest } from '../models';
import { useWeb3React } from '@web3-react/core';
import { getListTokens } from '../services/getListTokens';

// const getRoute = async (service: any, params: any): Promise<any> => {
//     try {
//         const result = await service.getDodoRoute(params);
//         if (result.status !== 200) {
//             throw new Error(result.data);
//         }
//         return result.data
//     } catch (error) {
//         console.log(error);

//         getRoute(service, params)

//     }
// }

const getNetworkAlias = (chainId: number | undefined, setAlias: (alias: string) => void) => {
    let alias: string;
    for (let i = 0; i < Networks.length; i++) {
        const matched: boolean = Networks[i].id === chainId;
        if (!matched) {
            continue
        }
        if (matched) {
            setAlias(Networks[i].aliasApi)
        }
    }

}

const Home = () => {

    const service = useService();
    const dispatch = useDispatch();
    const { account, chainId } = useWeb3React();
    const { tokenTo, tokenFrom, amountFrom, amountTo, dodoResquest, tokenList } = useStore();
    const store = useStore();
    const [alias, setAlias] = useState<string | null>(null)

    useEffect(() => {
        dispatch({
            type: actions.setDodoRequest,
            payload: {
                fromTokenAddress: tokenFrom.address,
                fromTokenDecimals: tokenFrom.decimals,
                toTokenAddress: tokenTo.address,
                toTokenDecimals: tokenTo.decimals,
                fromAmount: amountFrom,
                userAddr: account,
                chainId: chainId

            }
        })

        // getRoute(service, dodoResquest).then((data) => {
        //     dispatch({
        //         type: actions.setTradeRequest, payload: {
        //             targetApprove: data.targetApproveAddr,
        //             proxyAddress: data.to,
        //             requestData: data.data
        //         }
        //     })
        //     dispatch({
        //         type: actions.setAmountTo, payload: data.resAmount
        //     }
        //     )
        // })

    }, [tokenTo, tokenFrom, amountFrom, account, chainId])

    useEffect(() => {
        console.log(store)
    }, [store])

    useEffect(() => {
        getNetworkAlias(chainId, setAlias)
    }, [chainId])

    useEffect(() => {
        if (!account) {
            return
        }
        getListTokens(alias).then((tokens) => {
            dispatch({
                type: actions.setTokenList,
                payload: tokens
            })
        })
    }, [alias])

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
