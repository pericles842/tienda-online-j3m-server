
export interface ApiRatesResponse {
  current: ApiRates,
  previous: ApiRates,
  changePercentage: Omit<ApiRates, 'date'>,
}

export interface ApiRates {
  usd: number,
  eur: number,
  date: string
}