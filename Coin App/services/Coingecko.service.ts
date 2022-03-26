import axios from "axios";
import CoinGeckoApi from "../constants/CoinGeckoApi";

/**
 * List of api calls to Coin Gecko Service
 */

/**
 * Get list of coin market data
 */
export const getCoinMarketsAsync = async (query: string) => {

    const { apiBase, marketsEndpoint } = CoinGeckoApi;
    try {
        const json = await axios.get(`${apiBase}${marketsEndpoint}${query}`);
        return json.data;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Get details of individual coin data by coin id
 */
export const getCoinDetailsAsync = async (id: string, query: string) => {

    const { apiBase, coinEndpoint } = CoinGeckoApi;
    const coinApi = coinEndpoint.replace("{id}", id);
    try {
        const json = await axios.get(`${apiBase}${coinApi}${query}`);
        return json.data;
    } catch (error) {
        console.error(error);
    }
};