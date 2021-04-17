import { ChainId, Token, Pair, TokenAmount, WRAPPED, Price } from '../src'

describe('Pair', () => {
  const ENE = new Token(ChainId.MOONBEAM_TEST, '0x6eD79Aa1c71FD7BdBC515EfdA3Bd4e26394435cC', 18, 'ENE', 'ENE Token')
  const WIN = new Token(ChainId.MOONBEAM_TEST, '0xA94B7f0465E98609391C623d0560C5720a3f2D33', 18, 'WIN', 'WIN Token')
  
  const ENE_B = new Token(ChainId.BINANCE_TEST, '0x3Cc7B9a386410858B412B00B13264654F68364Ed', 18, 'ENE', 'ENE Token')
  const WIN_B = new Token(ChainId.BINANCE_TEST, '0xAe5057BB185fC820219e21bC7382c0DE7A42fE86', 18, 'WIN', 'WIN Token')

  const ENE_R = new Token(ChainId.ROPSTEN, '0xB4B6D45d4706BBd93bb0e14e517B81453db0468C', 18, 'ENE', 'ENE Token')
  const WIN_R = new Token(ChainId.ROPSTEN, '0x2fE357d6F828777c36209973227a75cB8afe7626', 18, 'WIN', 'WIN Token')

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() => new Pair(new TokenAmount(ENE, '100'), new TokenAmount(WRAPPED[ChainId.MAINNET], '100'))).toThrow(
        'CHAIN_IDS'
      )
    })
  })
  
  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(ENE, WIN)).toEqual('0xE125593E4A48D10A2cbe5969b8ea78aBB65230C8')
      expect(Pair.getAddress(ENE_B, WIN_B)).toEqual('0x9e2c1e69Ab44011d47a039fbA6e7C7b7d48ea545')
      expect(Pair.getAddress(ENE_R, WIN_R)).toEqual('0xeAB884b321fcB368F873d9664b3aA9fCd95490De')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(ENE, '100'), new TokenAmount(WIN, '100')).token0).toEqual(ENE)
      expect(new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '100')).token0).toEqual(ENE)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(ENE, '100'), new TokenAmount(WIN, '100')).token1).toEqual(WIN)
      expect(new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '100')).token1).toEqual(WIN)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '101')).reserve0).toEqual(
        new TokenAmount(ENE, '101')
      )
      expect(new Pair(new TokenAmount(ENE, '101'), new TokenAmount(WIN, '100')).reserve0).toEqual(
        new TokenAmount(ENE, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '101')).reserve1).toEqual(
        new TokenAmount(WIN, '100')
      )
      expect(new Pair(new TokenAmount(ENE, '101'), new TokenAmount(WIN, '100')).reserve1).toEqual(
        new TokenAmount(WIN, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(WIN, '101'), new TokenAmount(ENE, '100')).token0Price).toEqual(
        new Price(ENE, WIN, '100', '101')
      )
      expect(new Pair(new TokenAmount(ENE, '100'), new TokenAmount(WIN, '101')).token0Price).toEqual(
        new Price(ENE, WIN, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(WIN, '101'), new TokenAmount(ENE, '100')).token1Price).toEqual(
        new Price(WIN, ENE, '101', '100')
      )
      expect(new Pair(new TokenAmount(ENE, '100'), new TokenAmount(WIN, '101')).token1Price).toEqual(
        new Price(WIN, ENE, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(WIN, '101'), new TokenAmount(ENE, '100'))
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(ENE)).toEqual(pair.token0Price)
      expect(pair.priceOf(WIN)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WRAPPED[ChainId.MOONBEAM_TEST])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '101')).reserveOf(WIN)).toEqual(
        new TokenAmount(WIN, '100')
      )
      expect(new Pair(new TokenAmount(ENE, '101'), new TokenAmount(WIN, '100')).reserveOf(WIN)).toEqual(
        new TokenAmount(WIN, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(ENE, '101'), new TokenAmount(WIN, '100')).reserveOf(WRAPPED[ChainId.MOONBEAM_TEST])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '100')).chainId).toEqual(ChainId.MOONBEAM_TEST)
      expect(new Pair(new TokenAmount(ENE, '100'), new TokenAmount(WIN, '100')).chainId).toEqual(ChainId.MOONBEAM_TEST)
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '100')).involvesToken(WIN)).toEqual(true)
    expect(new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '100')).involvesToken(ENE)).toEqual(true)
    expect(
      new Pair(new TokenAmount(WIN, '100'), new TokenAmount(ENE, '100')).involvesToken(WRAPPED[ChainId.MOONBEAM_TEST])
    ).toEqual(false)
  })

})
