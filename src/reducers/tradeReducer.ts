import { actions } from '../constants';
import { TradeState } from '../models';

export const tradeStore: TradeState = {
    tokenFrom: {
        name: 'ETH',
        symbol: '',
        address: '',
        decimals: 0
    },
    tokenTo: {
        name: 'USDC',
        symbol: '',
        address: '',
        decimals: 0
    },
    amountFrom: '',
    amountTo: '0',
    dodoRequest: {
        fromTokenAddress: '',
        fromTokenDecimals: 0,
        toTokenAddress: '',
        toTokenDecimals: 0,
        fromAmount: '',
        slippage: 3,
        userAddr: '',
        chainId: 0,
        deadLine: 1200,
        source: '',
        rpc: ''
    },
    tradeRequest: {
        targetApprove: '',
        proxyAddress: '',
        requestData: ''
    },
    tokenList: []
}

const tradeReducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.setTokenFrom:
            return {
                ...state,
                tokenFrom: { ...state.tokenFrom, ...action.payload }
            }
        case actions.setTokenTo:
            return {
                ...state,
                tokenTo: { ...state.tokenTo, ...action.payload }
            }
        case actions.setAmountFrom:
            return {
                ...state,
                amountFrom: action.payload
            }
        case actions.setAmountTo:
            return {
                ...state,
                amountTo: action.payload
            }
        case actions.setSlippage:
            return {
                ...state,
                slippage: action.payload
            }
        case actions.setDeadLine:
            return {
                ...state,
                deadLine: action.payload
            }
        case actions.setSource:
            return {
                ...state,
                source: action.payload
            }
        case actions.setDodoRequest:
            return {
                ...state,
                dodoRequest: { ...state.dodoRequest, ...action.payload }
            }
        case actions.setTradeRequest:
            return {
                ...state,
                tradeRequest: { ...state.tradeRequest, ...action.payload }
            }
        case actions.setTokenList:
            return {
                ...state,
                tokenList: action.payload
            }
        default:
            return state;
    }
}

export default tradeReducer;