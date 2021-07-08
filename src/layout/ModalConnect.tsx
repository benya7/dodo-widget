import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useWeb3React } from '@web3-react/core';
import { Box, Button, Layer } from 'grommet';

import ModalTitle from '../components/ModalConnect/ModalTitle';
import ModalTerms from '../components/ModalConnect/ModalTerms';
import ModalNetworks from '../components/ModalConnect/ModalNetworks';
import ModalWallets from '../components/ModalConnect/ModalWallets';
import UserAccount from '../components/ModalConnect/UserAccount';

const ModalConnect = () => {

    const { account } = useWeb3React();
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState(false);
    const [network, setNetwork] = useState('')
    return (
        <Box>
            <Box pad={{horizontal: 'small'}}>
                { account ? <UserAccount /> : <Button primary size='small' label="Connect Wallet" onClick={() => setShow(true)} />}
            </Box>
            {show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => setShow(false)}
                >
                    <Box margin='medium' width='medium' gap='medium'>
                        <ModalTitle setShow={setShow} />
                        <ModalTerms checked={checked} setChecked={setChecked} />
                        <ModalNetworks network={network} checked={checked} setNetwork={setNetwork} />
                        <ModalWallets checked={checked} setShow={setShow} network={network}/>
                    </Box>
                </Layer>
            )}
        </Box>
    );
}

export default ModalConnect;