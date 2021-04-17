import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 1,
  MOONBEAM_TEST = 1287,
  BINANCE_TEST = 97,
  ROPSTEN = 3,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}


export const FACTORY_ADDRESS = {
  [ChainId.MAINNET]: '0x0000000000000000000000000000000000000000', 
  [ChainId.MOONBEAM_TEST]: '0xFC628dd79137395F3C9744e33b1c5DE554D94882',
  [ChainId.BINANCE_TEST]: '0xe1C915aBa8c97aD03E2803F744302783F7D81324', 
  [ChainId.ROPSTEN]: '0x2F4a92dE564238dAf88774E5DE6d3d6A7d9Bb4D1'
}

export const INIT_CODE_HASH = '0x746d1476e7e73be45baf2f3a541aaaa3b58699ca9c3665f8107c13f36ebe1c12'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
