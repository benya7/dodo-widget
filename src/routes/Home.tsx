import { h } from 'preact';
import { useContext, useState, useMemo, useEffect } from 'preact/hooks';
import { ServiceContext } from '../AppContext';
import ModalConnect from '../components/ModalConnect';
import { Box, Button } from 'grommet';
import PanelTrade from '../components/PanelTrade';
//import { DodoRequest } from '../models';

// const params: DodoRequest = {
//     fromTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
//     fromTokenDecimals: 18,
//     toTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
//     toTokenDecimals: 6,
//     fromAmount: '586240000000000',
//     slippage: 3,
//     userAddr: '0xa5Cf4DDFe4BfDbE712bD2f54EAadaCebb809fAED',
//     chainId: 1,
//     rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
// }

const Home = () => {

    const service = useContext(ServiceContext);

    return (
        <Box>
            <Box direction='row' gap='small' alignSelf='end' pad='small'>
            {/* <Button label='console service' onClick={() => {
                    service?.getDodoRoute(params).then((result) => {
                         console.log(result)
                    })
                }} /> */}
            <ModalConnect />
            
        </Box>
        <PanelTrade />
        </Box>

    );
};

export default Home;
