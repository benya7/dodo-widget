import { h } from "preact";
import { Box, Text, Select } from "grommet";
import { useEffect, useState } from 'preact/hooks';
import { getListTokens, useDispatch, useStore } from '../hooks';
import { actions, initialList } from '../constants';



const TokenTo = () => {
    const { tokenTo, amountTo } = useStore();
    const dispatch = useDispatch();
    const [options, setOptions] = useState(initialList);
    const [tokenList, setTokenList] = useState([]);
    useEffect(() => {
        getListTokens('mainnet').then((tokens) => {
            setTokenList(tokens)
            setOptions(tokens)
        })
    }, [])
    return (
        <Box gap='xsmall'>
            <Box
                direction='row'
                justify='between'
                align='center'
                pad={{ horizontal: 'small' }}
            >
                <Text size='small'>
                    Receive (Estimated)
                </Text>
                <Text size='small'>
                    Balance: 0
                </Text>
            </Box>
            <Box
                direction='row'
                alingContent='between'
                justify='center'
                align='center'
                background='light-6'
                round='medium'
            >
                <Select
                    size="small"
                    defaultValue={tokenTo.name}
                    placeholder="Select Token"
                    options={options}
                    labelKey='symbol'
                    valueKey={{ key: 'symbol', reduce: true }}
                    onChange={({ option }: any) => dispatch({ type: actions.setTokenTo, payload: option })}
                    onClose={() => setOptions(tokenList)}
                    onSearch={(text: any) => {
                        // The line below escapes regular expression special characters:
                        // [ \ ^ $ . | ? * + ( )
                        const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

                        // Create the regular expression with modified value which
                        // handles escaping special characters. Without escaping special
                        // characters, errors will appear in the console
                        const exp = new RegExp(escapedText, 'i');
                        setOptions(tokenList.filter((o: any) => exp.test(o.symbol)));
                    }}
                />
                <Box width='390px' pad={{ right: 'medium' }}>
                    <Text
                        textAlign= 'end'
                        size='small'
                    >
                        {amountTo}
                    </Text>
                </Box>
            </Box>
        </Box>

    )
}

export default TokenTo;