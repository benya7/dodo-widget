import { useWeb3React } from '@web3-react/core';
import { h } from 'preact';
import { Text, Box, Button } from "grommet";
import { useDispatch } from '../hooks';
import { actions } from '../constants';
import { tradeStore } from '../reducers/tradeReducer';

const UserAccount = () => {
    const { account, deactivate } = useWeb3React()
    const distpatch = useDispatch();
    return (
        <Box direction='row' alignSelf='end' align='center' justify='center' gap='small'>
            <Text size='small'>
                {
                    account ?
                        `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ''
                }
            </Text>
            <Button size='small' label='Disconnect' onClick={() => {
                deactivate()
                window.location.reload()
            }}>
            </Button>
        </Box>
    )
}

export default UserAccount;