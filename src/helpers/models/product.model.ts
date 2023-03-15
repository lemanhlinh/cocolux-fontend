export interface ProductVariant {
    name: string;
    options: [];
}

export interface ProductPrice {
    price: number;
    normal_price: number;
}

export interface ProductCategory {
    id: number;
    name: string;
    logo: string;
    slug: string;
}

export interface ProductAttribute {
    id: number;
    name: string;
    fullname: string;
    value: {
        id: number;
        name: string;
    };
}

export interface ProductPart {
    id: string;
    name: string;
    thumbnail_url: string;
    total_quantity: number;
    total_price: number;
    price: number;

    // manager
    product_id: string;
    created_by: object;
    created_at: Date;
    updated_at: Date;
}

export interface ProductDiscount {
    id: number;
    name: string;
    rate: number;
    type: number;
    value: number;
}

export interface ProductDeal {
    id: number;
    code: string;
    name: string;
    rate: number;
    value: number;
    price: number;
    image_layer: string;
    max_quantity: number;
    normal_price: number;
    discount_status: boolean;
    total_stock_quantity: number;
    total_available_quantity: number;
}

export interface ProductOption {
    id: string;
    sku: string;
    name: string;
    slug: string;
    option_id: string;
    parent_id: string;
    barcode: string;
    brand: string;
    images: [string];
    options: [number];
    indexes: [number];
    stocks: [object];
    price_books: [object];
    type: number;

    // currency
    discount: ProductDiscount;
    hot_deal: ProductDeal;
    flash_deal: ProductDeal;
    current_deal: ProductDeal;
    // deal_sale: object;
    // bundel_deal: object;
    // add_on_deal: object;
    total_quantity: number;
    campaign_option_id: number;
    total_final_quantity: number;
    discount_value: number;
    discount_rate: number;
    original_price: number;
    normal_price: number;
    price: number;

    // manager
    created_by: object;
    created_at: Date;
    updated_at: Date;
}

export interface ProductModel {
    // detail
    id: number;
    sku: string;
    type: number;
    name: string;
    slug: string;
    barcode: string;
    deal_layer: string;
    background_url: string;
    thumbnail_url: string;
    hashtag: [string];
    description: string;
    brand: string;
    guide: string;

    // attributes
    parts: [ProductPart];
    models: [ProductOption];
    variations: [ProductVariant];
    categories: [ProductCategory];
    attributes: [ProductAttribute];

    // price & deal
    campaign: {
        id: number;
        name: string;
    };
    // deal_sale: object;
    // bundel_deal: object;
    // add_on_deal: object;
    discount_value: number;
    discount: ProductDiscount;
    hot_deal: ProductDeal;
    flash_deal: ProductDeal;
    current_deal: ProductDeal;
    original_price: number;
    normal_price: number;
    price: number;

    // stock
    unit: string;
    weight: number;
    stocks: [any];
    stock_min: number;
    stock_max: number;
    quantity: number;
    total_quantity: number;

    // social seo
    meta_url: string;
    meta_title: string;
    meta_image: string;
    meta_keyword: string;
    meta_description: string;

    // manager
    created_by: object;
    expired_at: Date;
    created_at: number;
    updated_at: Date;
}
