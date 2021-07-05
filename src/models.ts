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

export interface DodoResponse {
    status: number;
    data: {
        resAmount: number;
        resCostGas: number;
        resPricePerToToken: number;
        resPricePerFromToken: number;
        priceImpact: number;
        targetDecimals: number;
        targetApproveAddr: string;
        to: string;
        data: string;
        useSource: string;
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

