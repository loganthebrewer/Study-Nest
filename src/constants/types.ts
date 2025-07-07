export type LocalMarketplaceListing = { //For early testing purposes only. Will be deleted later.
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

export type MarketplaceListing {
    mp_post_id : string;
    created_at : Date;
    updated_at : Date;
    title : string;
    description : string;
    status : LocalMarketplaceListing
    author_id : string;
    price : number; 
}

export type MarketplacePostImage {
    post_id : string;
    img_url : string;
    img_position : number;
}