import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import MarketplacePostCard from '@/components/MarketplacePostCard';
import listings from '@assets/data/marketplaceTestData';
import { View } from '@/components/Themed';

const MarketplaceView = () => {
	return (
		<View style={styles.screenContainer}>
			<FlatList
				data={listings}
				renderItem={({ item }) => <MarketplacePostCard listing={item} />}
				numColumns={2}
				contentContainerStyle={{ padding: 10, gap: 10 }}
				columnWrapperStyle={{ gap: 10 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
});

export default MarketplaceView;
