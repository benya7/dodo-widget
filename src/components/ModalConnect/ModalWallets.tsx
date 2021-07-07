import { h } from "preact";
import { Box, Text, Button, Avatar, Spinner } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'preact/hooks';
import { getParams, switchChain } from "../../services/networkHandler";
import { Wallets } from "../../constants";

interface IProps {
    checked: boolean;
    setShow: (show: boolean) => void;
    network: string;
}

const LoaderSpinner = () => {
    return (
        <Box justify='center' align='center' alignSelf='center' gap='small'>
            <Spinner size='medium' />
            <Text size='small'>
                Waiting confirmation..
            </Text>
        </Box>
    )
}
const WalletSelector = ({ checked }: any) => {
    const { activate } = useWeb3React()
    return (
        <Box>
            <Text size='small'>
                Select Wallet
            </Text>
            <Box direction='row' gap='medium'>
                {Wallets.map((wallet: any, index: number) => (
                    <Button
                        hoverIndicator
                        key={index}
                        disabled={!checked}
                        onClick={() => {
                            activate(wallet.connector).then(() => {

                            })
                        }}>
                        <Box justify='center' align='center' gap='xsmall' pad='small'>
                            <Avatar background='dark-2'>
                                <Avatar size='30px' src={wallet.logo} />
                            </Avatar>
                            <Text size='small'>
                                {wallet.name}
                            </Text>
                        </Box>
                    </Button>
                ))}
            </Box>
        </Box>
    )
}

const ModalWallets = ({ checked, setShow, network }: IProps) => {
    const { chainId, library } = useWeb3React()
    const [reqLoad, setReqLoad] = useState(false)
    useEffect(() => {
        if (chainId) {
            const params: any = getParams(chainId, network);

            if (params) {
                setReqLoad(true)

                switchChain(params, library).then(() => {
                    setReqLoad(false)
                    setShow(false)

                })
            }
            if (!params) {
                setShow(false)
            }
        }


    }, [chainId, network])

    return (
        <Box alignSelf={reqLoad ? 'center' : 'start'} gap='xsmall'>
            {reqLoad ? (<LoaderSpinner />)
                : <WalletSelector checked={checked} />
            }
        </Box>
    )
}

export default ModalWallets;