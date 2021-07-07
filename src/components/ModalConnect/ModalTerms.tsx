import { h } from 'preact';
import { Text, Anchor, Box, CheckBox } from 'grommet';
const TermsOfService = () => <Text size='small'>I have read, understand, and agree to <Anchor label='Terms of Service.' href='https://dodoexhelp.zendesk.com/hc/en-us/articles/900004302926' target='_blank' /></Text>

interface IProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

const ModalTerms = ({checked, setChecked}: IProps) => {
    return (
        <Box direction='row' alignSelf='start'>
            <CheckBox
                checked={checked}
                label={<TermsOfService />}
                onChange={(event: any) => setChecked(event.target.checked)}
            />
        </Box>
    )
}

export default ModalTerms;