import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Image, Text, View, Pressable, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { CoinItem, MarketList } from '../common/Models';
import { formatCoinDetail, formatMarketList } from '../common/Utility';
import QueryParameters from '../constants/QueryParameters';
import { getCoinDetailsAsync, getCoinMarketsAsync } from '../services/Coingecko.service';
import { DataTable } from 'react-native-paper';
import { CoinDetail } from './CoinDetail';

/**
 * CoinList component shows a tabular view for all the coins
 */
export const CoinsList = () => {
    const [coinmarketList, setCoinMarketList] = useState<MarketList[]>();
    const [coinData, setCoinData] = useState<CoinItem>();
    const [loadingCoin, setLoadingCoin] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const { currency, marketsOrderby, perPage } = QueryParameters;

    /**
     * Load list of coin data from api only once when coin list component is loaded first time
     */
    useEffect(() => {
        const queryString = `?vs_currency=${currency}&order=${marketsOrderby}&per_page=${perPage}&page=1&sparkline=false`;
        getCoinMarketsAsync(queryString).then((d) => {
            //Format the raw data and set the state
            const formattedData = formatMarketList(d);
            setCoinMarketList(formattedData);
        })
    }, []);

    /**
     * On click of a row in tabular view query api with coin id
     */
    const onRowClick = (id: string) => {
        //Set modal visibilty and loading progress spinner visibility
        setShowDetail(true);
        setLoadingCoin(true);

        //Query api
        const queryString = `?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
        getCoinDetailsAsync(id, queryString).then(d => {
            //Format the raw data and set the state
            const formattedData = formatCoinDetail(d);
            setCoinData(formattedData);
            //Set hide loading progress spinner
            setLoadingCoin(false);
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{'Coins List'}</Text>
            <View style={styles.separator}></View>
            {coinmarketList && coinmarketList.length > 0 &&
                <DataTable key="datatable">
                    <DataTable.Header>
                        <DataTable.Title key='nameheader'>Name</DataTable.Title>
                        <DataTable.Title key='symbolheader'>Symbol</DataTable.Title>
                        <DataTable.Title numeric key='priceheader'>Current Price</DataTable.Title>
                        <DataTable.Title numeric key='highheader'>High (24h)</DataTable.Title>
                        <DataTable.Title numeric key='lowheader'>Low (24h)</DataTable.Title>
                    </DataTable.Header>
                    {coinmarketList.map((coin, index) => (
                        <View key={'viewcontainer' + index}>
                            <Pressable onPress={() => onRowClick(coin.Id)} key={'pressable' + index}>
                                <DataTable.Row key={'row' + index}>
                                    <DataTable.Cell style={styles.cellStyle}>
                                        <Image style={styles.image} source={{ uri: coin.Image }} />
                                        {coin.Name}
                                    </DataTable.Cell>
                                    <DataTable.Cell>{coin.Symbol}</DataTable.Cell>
                                    <DataTable.Cell numeric>{coin.CurrentPrice}</DataTable.Cell>
                                    <DataTable.Cell numeric>{coin.High}</DataTable.Cell>
                                    <DataTable.Cell numeric>{coin.Low}</DataTable.Cell>
                                </DataTable.Row>
                            </Pressable>
                            {/* Below section implement modal view on click of each row */}
                            {showDetail &&
                                <View style={styles.centeredView} key={'modal' + index}>
                                    <Modal animationType="fade" visible={showDetail} key={coin.Id}>
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView}>
                                                {
                                                    !loadingCoin && coinData && <ScrollView style={{}}>
                                                        <CoinDetail coin={coinData} />
                                                        <View style={styles.buttonContainer}>
                                                            <Button title='Close' key={'btnClose'}
                                                                onPress={() => setShowDetail(false)}>Close</Button>
                                                        </View>

                                                    </ScrollView>
                                                }
                                                {
                                                    loadingCoin && <ActivityIndicator size="large" color="#00ff00" />
                                                }

                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                            }
                        </View>
                    ))
                    }
                </DataTable>
            }
        </View>
    );
}

/**
 * CoinList styles css in js definitions
 */
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE'
    },
    header: {
        fontSize: 20
    },
    image: {
        height: 20,
        width: 20,
        marginRight: 4,
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        marginLeft: '10%',
        maxWidth: '80%'
    },
    cellStyle: {
        marginRight: 4
    },
    buttonContainer: {
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
