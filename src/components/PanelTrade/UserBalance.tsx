import { useWeb3React } from '@web3-react/core';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Box, Text } from 'grommet';
import { formatEther } from '@ethersproject/units';
import { ERC20Abi, nativeTokenAdress } from '../../constants';
import { Contract } from '@ethersproject/contracts';

export const UserBalance = (props: any) => {
    const { account, library } = useWeb3React()
    const tokenAddress = props.tokenAddress;
    const [balance, setBalance] = useState<number>(0)

    useEffect((): any => {
        if (account && library) {
            let stale = false

            if ((tokenAddress !== '') && (tokenAddress === nativeTokenAdress)) {
                library.getBalance(account).then((balance: any) => {
                    if (!stale) {
                        setBalance(balance)
                    }
                })
            }

            if (tokenAddress !== '' && tokenAddress !== nativeTokenAdress && library) {
                let signer = library.getSigner()
                const erc20 = new Contract(tokenAddress, ERC20Abi, signer);
                erc20.balanceOf(account).then((balance: any) => {
                    setBalance(balance)
                })
            }


            return () => {
                stale = true
                setBalance(0)
            }
        }
    }, [account, library, tokenAddress])

    return (
        <Box>
            <Text size='14px'>
                {account ? `Balance:  ${formatEther(balance)}` : ''}
            </Text>
        </Box>
    )
}