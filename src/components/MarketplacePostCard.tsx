import { Pressable, StyleSheet } from 'react-native';
import { Text, View as ThemedView} from '@/components/Themed';
import { View } from 'react-native';
import colors from '@/constants/colors';
import { Image } from 'react-native';
import { Link, router } from 'expo-router';
import { useColorScheme } from 'react-native';
import { LocalMarketplaceListing } from '@/constants/types';
import { MARKETPLACE_IMAGE_FALLBACK } from '@/constants/fallbacks';

export const defaultMarketplaceImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ListingListItemProps = {
    listing: LocalMarketplaceListing;
};



const ListingListItem = ({ listing } : ListingListItemProps) => {
    const colorScheme = useColorScheme();
    const imageBackgroundColor = colorScheme === 'dark' ? colors.dark.card: colors.light.card;

    const containerStyle = StyleSheet.flatten([
        styles.container,
        { backgroundColor: colorScheme === 'dark' ? colors.dark.card : colors.light.card }
    ]); // ran into an odd bug here where if the pressable had any square brackets in the props of the pressable the list would only show 1 column...

    return (
        <Link href={{ pathname: '/[id]', params: { id: listing.id.toString() }}} asChild>
            <Pressable style={containerStyle}>
                <Image source={{ uri: listing.thumbnail || MARKETPLACE_IMAGE_FALLBACK }} style={[ styles.image, {backgroundColor: imageBackgroundColor}]} />
                <View style={styles.bottomTextContainer}>
                    <Text numberOfLines={1} style={ styles.title } lightColor={colors.light.text} darkColor={colors.dark.text}>{ listing.title }</Text>
                    <Text style={ styles.price } lightColor={colors.light.tint} darkColor={colors.dark.tint}>${ listing.price }</Text>
                </View>
            </Pressable>
        </Link>
  );
};

export default ListingListItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderRadius: 15,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
    },
    bottomTextContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        maxWidth: 100
    },
    price: {
        fontSize: 15,
    },
});
