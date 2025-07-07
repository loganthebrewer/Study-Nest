export type MarketplaceListing = {
    id: number;
    title: string;
    thumbnail: string | null;
    price: number;
    status: MarketplaceListingStatus;
}

enum MarketplaceListingStatus {
    Sold = 0,
    Available = 1,
}