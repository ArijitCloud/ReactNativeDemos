import { CoinItem, MarketList } from "./Models";

/**
* format raw api data to strongly typed data
*/
export const formatMarketList = (rawData: any[]): MarketList[] => {
    return rawData.map(r => ({
        Id: r.id,
        Image: r.image,
        Name: r.name,
        Symbol: r.symbol,
        CurrentPrice: r.current_price,
        High: r.high_24h,
        Low: r.low_24h
    } as MarketList));
}

/**
* format raw api data to strongly typed data
*/
export const formatCoinDetail = (rawData: any): CoinItem => {
    const r = rawData;
    return {
        Name: r.name,
        Symbol: r.symbol,
        HashingAlgorithm: r.hashing_algorithm,
        Description: r.description.en,
        MarketCap: r.market_data.market_cap.eur,
        Homepage: r.links.homepage[0],
        GenesisDate: r.genesis_date
    } as CoinItem;
}

/**
* Get only first n character of a string, based on legnth propery
*/
export const limitLargeText = (text: string, length: number): string => {
    return text.substring(0, length);
}