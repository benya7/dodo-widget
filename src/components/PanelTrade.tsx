import { h } from 'preact';
import { Box, Button, Text } from "grommet";
import TokenFrom from './TokenFrom';
import TokenTo from './TokenTo';
import { useEffect, useState } from 'preact/hooks';

const PanelTrade = () => {
    
    return (
        <Box pad={{ top: 'small', bottom: 'xsmall', horizontal: 'medium' }} gap='medium'>
            <Box gap='small'>
                <TokenFrom />
                <TokenTo />
            </Box>
            <Box align='center' gap='small'>
                <Text size='small'>
                    1 ETH = 2554.545544 USDC
                </Text>
                <Text size='small'>
                    fetching bests prices
                </Text>

                <Button label='Confirm Order' />
            </Box>
            <Box gap='small'>
                <Box direction='row' justify='between'>
                    <Text size='small'>
                        Slippage Tolerance?:
                    </Text>
                    <Text size='small'>
                        3.0
                    </Text>
                </Box>
                <Box direction='row' justify='between'>
                    <Text size='small'>
                        Minimun Received?:
                    </Text>
                    <Text size='small'>
                        2500.23
                    </Text>
                </Box>
                <Box direction='row' justify='between'>
                    <Text size='small'>
                        Estimated Network Fee
                    </Text>
                    <Text size='small'>
                        $30.45
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}
export default PanelTrade;