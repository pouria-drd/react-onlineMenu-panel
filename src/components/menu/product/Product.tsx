import { useState } from "react";
import { Button, StatusBadge } from "../../ui";

import ItemCard from "../ItemCard";
import ItemIcon from "../ItemIcon";
import ItemTitle from "../ItemTitle";
import ItemHeader from "../ItemHeader";
import ItemAction from "../ItemAction";
import Modal from "../../ui/modal/Modal";
import DateBadge from "../../ui/badge/DateBadge";
import ProductForm from "../../forms/ProductForm";

interface ProductProps {
    product: Product;
    onProductUpdate: () => void;
}

const Product = ({ product, onProductUpdate }: ProductProps) => {
    const [openPatchProductForm, setOpenPatchProductForm] =
        useState<boolean>(false);

    return (
        <>
            <ItemCard>
                <ItemHeader>
                    <ItemIcon
                        iconUrl={product.icon}
                        altName={`${product.name}`}
                    />
                    <StatusBadge isActive={product.isActive} />
                </ItemHeader>

                <ItemTitle title={`${product.name}`}>
                    <p className="text-gray-700 text-sm text-left ss02">
                        {product.price} تومان
                    </p>
                </ItemTitle>
                <DateBadge
                    createdAt={product.createdAt}
                    updatedAt={product.updatedAt}
                />
                <ItemAction>
                    <Button
                        onClick={() => setOpenPatchProductForm(true)}
                        btnType="light"
                        className="w-full">
                        ویرایش
                    </Button>
                </ItemAction>
            </ItemCard>
            {openPatchProductForm && (
                <Modal
                    onClose={() => setOpenPatchProductForm(false)}
                    title={`بروزرسانی ${product.name}`}>
                    <ProductForm
                        product={product}
                        method="patch"
                        categoryId={product.category}
                        onSuccess={() => {
                            onProductUpdate();
                            setOpenPatchProductForm(false);
                        }}
                    />
                </Modal>
            )}
        </>
    );
};

export default Product;
