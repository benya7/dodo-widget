interface InfraConfigurations {
    element?: Element;
}

export interface AppConfigurations {
    debug: boolean;
    dodoBaseUrl: string;
    cGeckoBaseUrl: string;
    targetId: string;
}

export type Configurations = InfraConfigurations & AppConfigurations;

export interface INetwork {
    chainId: string;
    nameNet: string;
    name: string;
    rpc: string;
    symbol: string;
    explorer: string;
}

export interface DodoResponse {
    status: number;
    data: {
        resAmount: string;
        resPricePerToToken: string;
        resPricePerFromToken: string;
        priceImpact: string;
        targetApproveAddr: string;
        to: string;
        data: string;
    }
}
export interface DodoRequest {
    fromTokenAddress: string;
    fromTokenDecimals: number;
    toTokenAddress: string;
    toTokenDecimals: number;
    fromAmount: string;
    slippage: number;
    userAddr: string;
    chainId: number;
    rpc: string;
    deadLine?: number;
    source?: string;
}
export interface DodoApi {
    getDodoRoute: (params: DodoRequest) => Promise<DodoResponse>;
}

