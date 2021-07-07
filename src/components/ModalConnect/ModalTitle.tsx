import { h } from 'preact';
import { FormClose } from 'grommet-icons';
import { Box, Button, Text } from 'grommet';
interface IProps {
    setShow: (show: boolean) => void;

}
const ModalTitle = ({ setShow }: IProps) => {
    return (
        <Box>
            <Box direction='row' alignSelf='end'>
                <Button onClick={() => { setShow(false) }}>
                    <FormClose />
                </Button>
            </Box>
            <Box direction='row' alignSelf='start'>
                <Text>
                    Connect Wallet
                </Text>
            </Box>
        </Box>
    )
}

export default ModalTitle;