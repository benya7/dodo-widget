import { ServiceContext, TradeContext } from './AppContext';
import { useContext } from 'preact/hooks';
import axios from 'axios';

const baseURL: string = 'https://cdn-static.dodoex.io/erc-20-s'
export const useService = (): any => useContext(ServiceContext);
export const useStore = (): any => useContext(TradeContext)[0]
export const useDispatch = (): any => useContext(TradeContext)[1]

export const getListTokens = async (chainName: string): Promise<any> => {
    try {
        const tokenList: Array<any> = []

        const result = await axios.get(baseURL, { params: { '_limit': 1000, 'chains.name': chainName } })
        if (result.status === 200) {
            const tokens = result.data
            tokens.map((token: any) => {
                tokenList.push({
                    id: token.id,
                    address: token.address,
                    decimals: token.decimals,
                    name: token.name,
                    symbol: token.symbol
                })
            })
            return tokenList;
        }
    } catch (error) {
        console.log(error)
    }

}