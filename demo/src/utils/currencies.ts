interface ExtendedNumberFormat extends Intl.NumberFormat {
  formatCents: (value: number) => string;
}

const EURO = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
}) as ExtendedNumberFormat;

EURO.formatCents = function(value: number) {
  return this.format(value / 100)
}

export { EURO };
