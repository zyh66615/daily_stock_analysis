import { describe, expect, it } from 'vitest';
import { detectReportMarket, getPriceChangeColor } from '../marketColor';

describe('marketColor', () => {
  it('detects A-share and HK markets from stock codes', () => {
    expect(detectReportMarket('600519')).toBe('cn');
    expect(detectReportMarket('600519.SH')).toBe('cn');
    expect(detectReportMarket('00700.HK')).toBe('hk');
    expect(detectReportMarket('HK00700')).toBe('hk');
  });

  it('detects US markets from common US code formats', () => {
    expect(detectReportMarket('AAPL')).toBe('us');
    expect(detectReportMarket('AAPL.US')).toBe('us');
    expect(detectReportMarket('BRK.B')).toBe('us');
  });

  it('maps price change colors by market convention', () => {
    expect(getPriceChangeColor(1.2, '600519')).toBe('var(--home-price-up)');
    expect(getPriceChangeColor(-1.2, '600519')).toBe('var(--home-price-down)');
    expect(getPriceChangeColor(1.2, 'AAPL')).toBe('var(--home-price-down)');
    expect(getPriceChangeColor(-1.2, 'AAPL')).toBe('var(--home-price-up)');
  });
});
