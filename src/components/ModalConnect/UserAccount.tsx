import { useWeb3React } from '@web3-react/core';
import { h } from 'preact';
import { Anchor, Box, Button } from "grommet";
import { useStore } from '../../hooks';

const UserAccount = () => {
    const { account, deactivate } = useWeb3React()
    const { explorerUrl } = useStore();
    return (
        <Box direction='row' alignSelf='end' align='center' justify='center' gap='small'>
            <Anchor target='_blank' size='small' href={`${explorerUrl}/address/${account}`} label={
                    account ?
                        `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ''
                } />
            <Button size='small' label='Disconnect' onClick={() => {
                deactivate()
                window.location.reload()
            }}>
            </Button>
        </Box>
    )
}

export default UserAccount;