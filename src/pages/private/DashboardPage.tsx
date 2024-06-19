import { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import { useToast } from "../../components/ui/toast/ToastProvider";

import api from "../../api/axiosInstance";
import Modal from "../../components/ui/modal/Modal";
import PageHeader from "../../components/navbar/PageHeader";
import PageLayout from "../../components/layouts/PageLayout";
import Category from "../../components/menu/category/Category";
import ItemContainer from "../../components/menu/ItemContainer";
import SpinnerCard from "../../components/ui/spinner/SpinnerCard";
import CategoryForm from "../../components/forms/CategoryForm";

function DashboardPage() {
    const { showToast } = useToast();

    const [openNewCatForm, setOpenNewCatForm] = useState<boolean>(false);

    const [menu, setMenu] = useState<MenuDetail | null>(null);

    const handleOpenModal = () => {
        setOpenNewCatForm(true);
    };

    const getCategories = async () => {
        try {
            const response = await api.get<MenuDetail>("categories/");

            if (response.status === 200) {
                setMenu(response.data);
                // console.log(response);
            }
        } catch (error: any) {
            setMenu(() => {
                return { categories: [], menuName: "" };
            });
            if (error.response.status && error.response.status === 404) {
                showToast("دسته ای برای نمایش وجود ندارد!", "warning", "توجه");
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
        getCategories();
    }, []);

    if (menu === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <SpinnerCard title="درحال دریافت اطلاعات" />
            </div>
        );
    }

    return (
        <>
            <PageLayout>
                <PageHeader className="flex items-center justify-between">
                    <Button
                        onClick={handleOpenModal}
                        className="text-xs sm:text-base"
                        btnType="dark"
                        outlined={true}>
                        دسته‌ جدید
                    </Button>
                    <h1 className="text-2xl font-bold text-center">
                        {menu.menuName}
                    </h1>
                </PageHeader>

                <ItemContainer>
                    {menu.categories.map((category, index) => (
                        <Category
                            key={index}
                            category={category}
                            onCategoryUpdate={() => {
                                getCategories();
                            }}
                        />
                    ))}
                </ItemContainer>
            </PageLayout>

            {openNewCatForm && (
                <Modal
                    onClose={() => setOpenNewCatForm(false)}
                    title="ایجاد دسته جدید">
                    <CategoryForm
                        method="post"
                        onSuccess={() => {
                            getCategories();
                            setOpenNewCatForm(false);
                        }}
                    />
                </Modal>
            )}
        </>
    );
}

export default DashboardPage;
