import { useNavigate } from "react-router-dom";
import { Button, StatusBadge } from "../../ui";

import ItemCard from "../ItemCard";
import ItemIcon from "../ItemIcon";
import ItemTitle from "../ItemTitle";
import ItemHeader from "../ItemHeader";
import ItemAction from "../ItemAction";
import ROUTES from "../../../router/routes";
import DateBadge from "../../ui/badge/DateBadge";

interface CategoryProps {
    category: Category;
}

const Category = ({ category }: CategoryProps) => {
    const navigate = useNavigate();

    const handleCategoryDetailView = () => {
        navigate(ROUTES.CATEGORY_DETAIL + "/" + category.id);
    };

    return (
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
                <Button btnType="light" className="w-full">
                    ویرایش
                </Button>
            </ItemAction>
        </ItemCard>
    );
};

export default Category;
