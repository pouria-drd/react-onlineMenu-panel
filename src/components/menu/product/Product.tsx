import { Button, StatusBadge } from "../../ui";

import ItemCard from "../ItemCard";
import ItemIcon from "../ItemIcon";
import ItemTitle from "../ItemTitle";
import ItemHeader from "../ItemHeader";
import ItemAction from "../ItemAction";
import DateBadge from "../../ui/badge/DateBadge";

interface ProductProps {
    product: Product;
}

const Product = ({ product }: ProductProps) => {
    return (
        <ItemCard>
            <ItemHeader>
                <ItemIcon iconUrl={product.icon} altName={`${product.name}`} />
                <StatusBadge isActive={product.isActive} />
            </ItemHeader>

            <ItemTitle title={`${product.name}`}>
                <p className="text-gray-700 text-sm ss02">
                    {product.price} تومان
                </p>
            </ItemTitle>
            <DateBadge
                createdAt={product.createdAt}
                updatedAt={product.updatedAt}
            />
            <ItemAction>
                <Button btnType="light" className="w-full">
                    ویرایش
                </Button>
            </ItemAction>
        </ItemCard>
    );
};

export default Product;
