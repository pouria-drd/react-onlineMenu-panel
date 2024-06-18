interface Menu {
    menuName: string;
    categories: Category[];
}

interface Category {
    id: string;
    menu: string;
    menuName: string;
    name: string;
    icon?: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}
