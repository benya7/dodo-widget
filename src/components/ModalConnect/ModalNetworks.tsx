import { h } from 'preact';
import { Box, Text, RadioButtonGroup } from 'grommet';
import { Networks } from '../../constants';

interface IProps {
    network: string;
    checked: boolean;
    setNetwork: (network: string) => void;
}
const ModalNetworks = ({ network, checked, setNetwork }: IProps) => {
    return (
        <Box alignSelf='start' gap='xsmall'>
            <Text size='small'>
                Select Network
            </Text>
            <RadioButtonGroup
                wrap
                name="networks"
                direction='row-responsive'
                options={Networks.map((network) => (
                    network.name
                )
                )}
                value={network}
                onChange={(event: any) => setNetwork(event.target.value)}
                disabled={!checked}
            />
        </Box>
    )
}

export default ModalNetworks;