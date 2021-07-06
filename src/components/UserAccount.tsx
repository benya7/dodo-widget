import { useWeb3React } from '@web3-react/core';
import { h } from 'preact';
import { Text, Box, Button } from "grommet";

const UserAccount = () => {
    const { account, deactivate } = useWeb3React()

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
            }}>
            </Button>
        </Box>
    )
}

export default UserAccount;