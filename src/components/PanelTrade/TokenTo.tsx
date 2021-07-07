import { h } from "preact";
import { Box, Text, Select, Spinner } from "grommet";
import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useStore } from '../../hooks';
import { actions, initialList } from '../../constants';
import { UserBalance } from "./UserBalance";



const TokenTo = () => {
    const { tokenTo, amountTo, amountFrom, tokenList, availableReq } = useStore();
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
                    Receive (Estimated)
                </Text>
                <UserBalance tokenAddress={tokenTo.address} />
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
                <Box width='390px' pad={{ right: 'medium' }} align='end' alignContent='end' justify='end'>
                {!availableReq && amountFrom > 0 ? <Spinner size='1px' /> : <Text textAlign='end' size='medium' > {amountTo}</Text>}
                    
                </Box>
            </Box>
        </Box>

    )
}

export default TokenTo;