import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, StatusBadge } from "../../ui";

import ItemCard from "../ItemCard";
import ItemIcon from "../ItemIcon";
import ItemTitle from "../ItemTitle";
import ItemHeader from "../ItemHeader";
import ItemAction from "../ItemAction";
import Modal from "../../ui/modal/Modal";
import ROUTES from "../../../router/routes";
import DateBadge from "../../ui/badge/DateBadge";
import CategoryForm from "../../forms/CategoryForm";

interface CategoryProps {
    category: Category;
    onCategoryUpdate: () => void;
}

const Category = ({ category, onCategoryUpdate }: CategoryProps) => {
    const navigate = useNavigate();

    const handleCategoryDetailView = () => {
        navigate(ROUTES.CATEGORY_DETAIL + "/" + category.id);
    };

    const [openPatchCategoryForm, setOpenPatchCategoryForm] =
        useState<boolean>(false);

    return (
        <>
            <ItemCard>
                <ItemHeader>
                    <ItemIcon
                        iconUrl={category.icon}
                        altName={`${category.name}`}
                    />
                    <StatusBadge isActive={category.isActive} />
                </ItemHeader>

                <ItemTitle title={`${category.name}`} />
                <DateBadge
                    createdAt={category.createdAt}
                    updatedAt={category.updatedAt}
                />
                <ItemAction>
                    <Button
                        btnType="light"
                        className="w-full"
                        onClick={handleCategoryDetailView}>
                        محصولات
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenPatchCategoryForm(true);
                        }}
                        btnType="light"
                        className="w-full">
                        ویرایش
                    </Button>
                </ItemAction>
            </ItemCard>

            {openPatchCategoryForm && (
                <Modal
                    onClose={() => setOpenPatchCategoryForm(false)}
                    title={`بروزرسانی ${category.name}`}>
                    <CategoryForm
                        method="patch"
                        category={category}
                        onSuccess={() => {
                            onCategoryUpdate();
                            setOpenPatchCategoryForm(false);
                        }}
                    />
                </Modal>
            )}
        </>
    );
};

export default Category;
