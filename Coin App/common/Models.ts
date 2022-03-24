/**
 * strongly typed models used in Coin App
 */

export interface MarketList {
    Id: string;
    Image: string;
    Name: string;
    Symbol: string;
    CurrentPrice: number;
    High: number;
    Low: number;
}

export interface CoinItem {      
    Name: string;
    Symbol: string;
    HashingAlgorithm: string;
    Description:string;
    MarketCap:number;
    Homepage:string;
    GenesisDate:string;
}