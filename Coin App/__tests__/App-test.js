import React from 'react';
import renderer from 'react-test-renderer';
import { App } from '../App';
import { CoinsList } from '../components/CoinsList';
import { CoinDetail } from '../components/CoinDetail';


describe("App snapshot verification", () => {

    /**
     * Method called to verify snapshot for App component
     */
    // test('App renders correctly', () => {
    //     const tree = renderer.create(<App />).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    /**
     * Method called to verify snapshot for CoinsList component
     * TODO: issues with fetch - Add Mock data
     */
    test('Coins list renders correctly', () => {
        const tree = renderer.create(<CoinsList />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    /**
    * Method called to verify snapshot for CoinDetail component
    * TODO: issues with fetch - Add Mock data
    */
    // test('Coin Detail renders correctly', () => {
    //     const tree = renderer.create(<CoinDetail />).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});