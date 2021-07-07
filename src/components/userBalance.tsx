import { useWeb3React } from '@web3-react/core';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Box, Text } from 'grommet';
import { formatEther } from '@ethersproject/units';

export const UserBalance = () => {
    const { account, library, chainId } = useWeb3React()

    const [balance, setBalance] = useState<number>(0)

    useEffect((): any => {
        if (account && library) {
            let stale = false

            library.getBalance(account).then((balance: any) => {
                if (!stale) {
                    setBalance(balance)
                }
            })
                .catch(() => {
                    if (!stale) {
                        setBalance(0)
                    }
                })

            return () => {
                stale = true
                setBalance(0)
            }
        }
    }, [account, library, chainId])

    return (
        <Box>
            <Text size='small'>
                {balance !== null ? `Ξ${formatEther(balance)}` : ''}
            </Text>
        </Box>
    )
}