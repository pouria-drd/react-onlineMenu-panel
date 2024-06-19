import { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../components/ui/toast/ToastProvider";

import ROUTES from "../../router/routes";
import api from "../../api/axiosInstance";
import Modal from "../../components/ui/modal/Modal";
import PageHeader from "../../components/navbar/PageHeader";
import Product from "../../components/menu/product/Product";
import PageLayout from "../../components/layouts/PageLayout";
import ProductForm from "../../components/forms/ProductForm";
import ItemContainer from "../../components/menu/ItemContainer";
import SpinnerCard from "../../components/ui/spinner/SpinnerCard";

const CategoryDetail = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { categoryId } = useParams();
    const [categoryData, setCategoryData] = useState<CategoryDetail | null>(
        null
    );

    const handleGoBack = () => {
        navigate(ROUTES.DASHBOARD);
    };

    const [openNewProductForm, setOpenNewCatForm] = useState<boolean>(false);

    const getProducts = async () => {
        try {
            const response = await api.get<CategoryDetail>(
                `categories/${categoryId}/products/`
            );

            if (response.status === 200) {
                setCategoryData(response.data);
                console.log(response.data);
            }

            // console.log(response.data);
        } catch (error: any) {
            setCategoryData(() => {
                return { products: [], categoryId: "", categoryName: "" };
            });
            if (error.response.status && error.response.status === 404) {
                showToast("محصولی برای نمایش وجود ندارد!", "warning", "توجه");
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

    useEffect(() => {
        getProducts();
    }, []);

    if (categoryData === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <SpinnerCard title="درحال دریافت اطلاعات" />
            </div>
        );
    }

    return (
        <>
            <PageLayout>
                <PageHeader className="flex items-center justify-between gap-2">
                    <Button
                        onClick={handleGoBack}
                        className="text-xs sm:text-base"
                        btnType="dark">
                        بازگشت
                    </Button>
                    <h1 className="text-2xl font-bold text-center">
                        {categoryData.categoryName}
                    </h1>
                    <Button
                        onClick={() => setOpenNewCatForm(true)}
                        className="text-xs sm:text-base"
                        btnType="dark"
                        outlined={true}>
                        محصول جدید
                    </Button>
                </PageHeader>

                <ItemContainer>
                    {categoryData.products.map((product, index) => (
                        <Product
                            onProductUpdate={() => {
                                getProducts();
                            }}
                            key={index}
                            product={product}
                        />
                    ))}
                </ItemContainer>
            </PageLayout>

            {openNewProductForm && (
                <Modal
                    onClose={() => setOpenNewCatForm(false)}
                    title="ایجاد محصول جدید">
                    <ProductForm
                        categoryId={categoryData.categoryId || categoryId!}
                        method="post"
                        onSuccess={() => {
                            getProducts();
                            setOpenNewCatForm(false);
                        }}
                    />
                </Modal>
            )}
        </>
    );
};

export default CategoryDetail;
