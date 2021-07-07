import { h } from 'preact';
import { Tip, Box, Paragraph } from 'grommet';
import {CircleQuestion} from 'grommet-icons';

export const TipTrade = (props: any) => {
    return (

        <Tip dropProps={{ align: { left: 'right' } }}
            content={
                <Box width='small' pad='none' margin='none'>

                    <Paragraph size='small' pad='none' margin='none'>
                        {props.text}
                    </Paragraph>
                </Box>
            }>
            <Box>
                <CircleQuestion size='small' />
            </Box>
        </Tip>

    )
}