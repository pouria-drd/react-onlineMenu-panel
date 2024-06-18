interface CategoryDetail {
    categoryName: string;
    products: Product[];
}

interface Product {
    id: string;
    category: string;
    name: string;
    price: string;
    icon?: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}
