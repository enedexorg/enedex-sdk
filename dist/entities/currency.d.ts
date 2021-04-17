import { ChainId } from '../constants';
/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export declare class Currency {
    readonly decimals: number;
    readonly symbol: string;
    readonly name: string;
    readonly chainId: ChainId;
    /**
     * The only instance of the base class `Currency`.
     */
    static readonly BASE_CURRENCY: {
        1: Currency;
        3: Currency;
        1287: Currency;
        97: Currency;
    };
    /**
     * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.BASE_CURRENCY`.
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     * @param chainId of the currency
     */
    protected constructor(chainId: ChainId, decimals: number, symbol: string, name: string);
}
declare const BASE_CURRENCY: {
    1: Currency;
    3: Currency;
    1287: Currency;
    97: Currency;
};
export { BASE_CURRENCY };
