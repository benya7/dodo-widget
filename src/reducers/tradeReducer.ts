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
    amountFrom: null,
    amountTo: '0',
    pricePerFromToken: null,
    dodoRequest: {
        fromTokenAddress: '',
        fromTokenDecimals: 0,
        toTokenAddress: '',
        toTokenDecimals: 0,
        fromAmount: '',
        slippage: 3,
        userAddr: '',
        chainId: 0,
        rpc: ''
    },
    tradeRequest: {
        targetApprove: '',
        proxyAddress: '',
        requestData: '',
        requestValue: ''
    },
    tokenList: [],
    availableReq: false
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
        case actions.setAvailableReq:
            return {
                ...state,
                availableReq: action.payload
            }
        case actions.setInitalStore:
            return {
                ...action.payload
            }
        case actions.setPricePerFromToken:
            return {
                ...state,
                pricePerFromToken: action.payload
            }
        default:
            return state;
    }
}

export default tradeReducer;