export interface User {
    id: number;
    name: string;
    note: string;
    phone: string;
    email: string;
    cover: string;
    avatar: string;
    address: string;
    birthday: Date;
    company: string;
    gender: string;

    province_code: string;
    district_code: string;
    ward_code: string;
    country: string;
    tax_code: string;

    is_verify_email: boolean;
    is_verify_password: boolean;
    is_verify_phone: boolean;

    total_debt: number;
    total_point: number;
    total_price: number;
    total_purchase: number;
    last_purchase: number;
}
