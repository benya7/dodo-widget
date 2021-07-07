import { h } from "preact";
import { Box, TextInput, Text, Select } from "grommet";
import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useStore } from '../../hooks';
import { actions, initialList } from '../../constants';
import { UserBalance } from "./UserBalance";

const TokenFrom = () => {
    const { tokenFrom, amountFrom, tokenList} = useStore();
    const dispatch = useDispatch();
    const [options, setOptions] = useState(initialList);

    const [listToken, setTokenList] = useState([]);
    
    useEffect(() => {
        setTokenList(tokenList)
        setOptions(tokenList)
    }, [tokenList])
    return (
        <Box gap='xsmall'>
            <Box
                direction='row'
                justify='between'
                align='center'
                pad={{ horizontal: 'small' }}
            >
                <Text size='15px'>
                    Pay
                </Text>
                <UserBalance tokenAddress={tokenFrom.address}/>
                
            </Box>
            <Box
                direction='row'
                justify='between'
                align='center'
                background='light-6'
                round='medium'
            >
                <Select
                    size="small"
                    defaultValue={tokenFrom.name}
                    placeholder="Select Token"
                    options={options}
                    labelKey='symbol'
                    valueKey={{ key: 'symbol', reduce: true }}
                    onChange={({ option }: any) => dispatch({ type: actions.setTokenFrom, payload: option })}
                    onClose={() => setOptions(listToken)}
                    onSearch={(text: any) => {
                        // The line below escapes regular expression special characters:
                        // [ \ ^ $ . | ? * + ( )
                        const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

                        // Create the regular expression with modified value which
                        // handles escaping special characters. Without escaping special
                        // characters, errors will appear in the console
                        const exp = new RegExp(escapedText, 'i');
                        setOptions(listToken.filter((o: any) => exp.test(o.symbol)));
                    }}
                />
                <Box width='380px' pad={{ right: 'small' }}>
                    <TextInput
                        reverse
                        plain
                        textAlign='end'
                        placeholder='0'
                        size='medium'
                        value={amountFrom}
                        onChange={(event: any) => {
                            dispatch({ type: actions.setAmountFrom, payload: event.target.value })
                        }}
                    />
                </Box>

            </Box>
        </Box>

    )
}

export default TokenFrom;