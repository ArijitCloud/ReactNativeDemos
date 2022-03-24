import React, { } from 'react';
import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { CoinItem } from '../common/Models';
import RenderHtml from 'react-native-render-html';
import { limitLargeText } from '../common/Utility';

/**
 * CoinDetail component takes detail of single coin item and displays it.
 * Some section of the code in this component commented out with explanation
 */
export const CoinDetail = ({ coin }: { coin: CoinItem }) => {

    // Limit large text for optimal view in specific device - numberoflines props control breaking for specific device
    // So this measure is still required even if using numberoflines props of Text
    let descriptionText = limitLargeText(coin.Description, 1000);
    descriptionText += Platform.OS === 'web' ? '' : '...';

    return (
        <View style={styles.container} >
            <Text style={styles.subSectionContainer}>
                <Text style={styles.subSectionTitle}>Name: </Text>
                <Text style={styles.subSectionValue}>{coin.Name}</Text>
            </Text>
            <Text style={styles.subSectionContainer}>
                <Text style={styles.subSectionTitle}>Symbol: </Text>
                <Text style={styles.subSectionValue}>{coin.Symbol}</Text>
            </Text>
            <Text style={styles.subSectionContainer}>
                <Text style={styles.subSectionTitle}>Hashing Algorithm: </Text>
                <Text style={styles.subSectionValue}>{coin.HashingAlgorithm ?? 'No hashing algorithm value found for this coin!'}</Text>
            </Text>
            <Text style={styles.subSectionContainer}>
                <Text style={styles.subSectionTitle}>Description: </Text>
                {/* Render html causing  device specific issue. But works well in web */}
                {/* <View style={{ flex: 1, padding: 8 }}>
                    <RenderHtml contentWidth={useWindowDimensions().width} source={{ html: descriptionText }} />
                </View> */}
                <Text style={styles.subSectionValue} numberOfLines={2}>
                    {descriptionText}
                </Text>

            </Text>
            <Text style={styles.subSectionContainer}>
                <Text style={styles.subSectionTitle}>Market Cap (EUR): </Text>
                <Text style={styles.subSectionValue}>{coin.MarketCap}</Text>
            </Text>
            <Text style={styles.subSectionContainer}>
                <Text style={styles.subSectionTitle}>Homepage: </Text>
                <Text style={styles.subSectionValue}>{coin.Homepage}</Text>
            </Text>
            <Text style={styles.subSectionContainer}>
                <Text style={styles.subSectionTitle}>Genesis Date: </Text>
                <Text style={styles.subSectionValue}>{coin.GenesisDate ?? 'No genesis date found for this coin!'}</Text>
            </Text>
        </View >
    );
}

/**
 * CoinDetail component styles using css in js definition
 */
const styles = StyleSheet.create({
    container: {
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
    subSectionContainer: {
        marginBottom: 8,
        flex: 1

    },
    subSectionTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    subSectionValue: {
        fontSize: 14
    }
});
