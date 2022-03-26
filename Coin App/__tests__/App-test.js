import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../App';


describe("App snapshot verification", () => {
    /**
     * Method called to verify App render
     */
    test('App renders correctly', () => {
        act(() => {
            renderer.create(<App />);
        });
    });
});