import axios from "axios"

const baseURL: string = 'https://cdn-static.dodoex.io/erc-20-s'

export const getListTokens = async (chainName: string | null): Promise<any> => {
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