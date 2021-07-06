import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { useWeb3React } from '@web3-react/core';
import { Box, Button, Layer } from 'grommet';

import ModalTitle from './ModalTitle';
import ModalTerms from './ModalTerms';
import ModalNetworks from './ModalNetworks';
import ModalWallets from './ModalWallets';
import UserAccount from './UserAccount';

const ModalConnect = () => {

    const { account } = useWeb3React();
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState(false);
    const [network, setNetwork] = useState('')
    return (
        <Box>
            <Box pad={{horizontal: 'small'}}>
                { account ? <UserAccount /> : <Button size='xsmall' label="Connect Wallet" onClick={() => setShow(true)} />}
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