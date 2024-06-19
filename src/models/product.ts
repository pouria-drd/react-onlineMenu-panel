interface CategoryDetail {
    categoryId: string;
    categoryName: string;
    products: Product[];
}

interface Product {
    id: string;
    category: string;
    name: string;
    price: string | number;
    icon?: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

interface ProductFormData {
    name: string;
    price: string | number;
    icon?: File | null;
    isActive: boolean;
}
