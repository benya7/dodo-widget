import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import ModalConnect from '../components/ModalConnect';
import { Box, Button } from 'grommet';
import PanelTrade from '../components/PanelTrade';
import { useDispatch, useStore, useService } from '../hooks';
import { actions } from '../constants';

import { DodoRequest } from '../models';
import { useWeb3React } from '@web3-react/core';

const getRoute = async (service: any, params: any): Promise<any> => {
    try {
        const result = await service.getDodoRoute(params);
        if (result.status !== 200) {
            throw new Error(result.data);
        }
        return result.data
    } catch (error) {
        console.log(error);

        getRoute(service, params)

    }
}



const Home = () => {

    const service = useService();
    const dispatch = useDispatch();
    const { account, chainId } = useWeb3React();
    const { tokenTo, tokenFrom, amountFrom, amountTo, dodoResquest } = useStore();
    const store = useStore();
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
    return (
        <Box>
            <Box direction='row' gap='small' alignSelf='end' pad='small'>
                <Button label='console service' onClick={() => {
                    
                    
                }} />
                <ModalConnect />

            </Box>
            <PanelTrade />
        </Box>

    );
};

export default Home;
