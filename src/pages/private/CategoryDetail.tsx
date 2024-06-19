import { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../components/ui/toast/ToastProvider";

import ROUTES from "../../router/routes";
import api from "../../api/axiosInstance";
import PageHeader from "../../components/navbar/PageHeader";
import Product from "../../components/menu/product/Product";
import PageLayout from "../../components/layouts/PageLayout";
import ItemContainer from "../../components/menu/ItemContainer";
import SpinnerCard from "../../components/ui/spinner/SpinnerCard";

const CategoryDetail = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { categoryId } = useParams();
    const [category, setCategory] = useState<CategoryDetail | null>(null);

    const handleGoBack = () => {
        navigate(ROUTES.DASHBOARD);
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await api.get<CategoryDetail>(
                    `categories/${categoryId}/products/`
                );

                if (response.status === 200) {
                    setCategory(response.data);
                    // console.log(response.data);
                }

                // console.log(response.data);
            } catch (error: any) {
                setCategory(() => {
                    return { products: [], categoryName: "" };
                });
                if (error.response.status && error.response.status === 404) {
                    showToast(
                        "محصولی ای برای نمایش وجود ندارد!",
                        "warning",
                        "توجه"
                    );
                } else {
                    showToast(
                        "دریافت اطلاعات ناموفق بود، دوباره تلاش کنید!",
                        "danger",
                        "خطا"
                    );
                }
                // console.error(error);
            }
        };

        getCategories();
    }, []);

    if (category === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <SpinnerCard title="درحال دریافت اطلاعات" />
            </div>
        );
    }

    return (
        <PageLayout>
            <PageHeader className="flex items-center justify-between">
                <Button
                    onClick={handleGoBack}
                    className="text-xs sm:text-base"
                    btnType="dark">
                    بازگشت
                </Button>
                <h1 className="text-lg sm:text-2xl font-bold text-center">
                    {category.categoryName} دسته‌بندی
                </h1>
                <Button
                    className="text-xs sm:text-base"
                    btnType="dark"
                    outlined={true}>
                    آیتم جدید
                </Button>
            </PageHeader>

            <ItemContainer>
                {category.products.map((product, index) => (
                    <Product key={index} product={product} />
                ))}
            </ItemContainer>
        </PageLayout>
    );
};

export default CategoryDetail;
