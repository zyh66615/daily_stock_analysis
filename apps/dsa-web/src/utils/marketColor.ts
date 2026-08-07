/**
 * Market-aware price color helpers.
 *
 * A/HK markets use the common mainland convention:
 * - Up = red
 * - Down = green
 *
 * US market follows the opposite convention:
 * - Up = green
 * - Down = red
 */

export type ReportMarket = 'cn' | 'hk' | 'us';

const A_SHARE_STYLE = {
  positive: 'var(--home-price-up)',
  negative: 'var(--home-price-down)',
} as const;

const US_STYLE = {
  positive: 'var(--home-price-down)',
  negative: 'var(--home-price-up)',
} as const;

const normalizeStockCode = (value?: string | null): string => (value || '').trim().toUpperCase();

export function detectReportMarket(stockCode?: string | null): ReportMarket {
  const code = normalizeStockCode(stockCode);
  if (!code) {
    return 'cn';
  }

  if (code.startsWith('HK') || code.endsWith('.HK') || /^\d{5}$/.test(code)) {
    return 'hk';
  }

  if (code.endsWith('.US')) {
    return 'us';
  }

  if (/^[A-Z]{1,5}(\.[A-Z]{1,2})?$/.test(code)) {
    return 'us';
  }

  return 'cn';
}

export function getPriceChangeColor(changePct: number | undefined, stockCode?: string | null): string | undefined {
  if (changePct === undefined || changePct === null || changePct === 0) {
    return undefined;
  }

  const market = detectReportMarket(stockCode);
  const style = market === 'us' ? US_STYLE : A_SHARE_STYLE;
  return changePct > 0 ? style.positive : style.negative;
}
