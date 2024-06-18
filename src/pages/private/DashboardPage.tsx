import { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import { useToast } from "../../components/ui/toast/ToastProvider";

import api from "../../api/axiosInstance";
import PageLayout from "../../components/layouts/PageLayout";
import Category from "../../components/menu/category/Category";
import ItemContainer from "../../components/menu/ItemContainer";
import SpinnerCard from "../../components/ui/spinner/SpinnerCard";
import PageHeader from "../../components/navbar/PageHeader";

function DashboardPage() {
    const { showToast } = useToast();
    const [menu, setMenu] = useState<MenuDetail | null>(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await api.get<MenuDetail>("categories/");

                if (response.status === 200) {
                    setMenu(response.data);
                    // console.log(response.data);
                    // console.log(response.data.categories);
                }
            } catch (error) {
                showToast(
                    "دریافت اطلاعات ناموفق بود، دوباره تلاش کنید!",
                    "danger",
                    "خطا"
                );
                // console.error(error);
            }
        };

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
        <PageLayout>
            <PageHeader className="flex items-center justify-between">
                <Button
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
                    <Category key={index} category={category} />
                ))}
            </ItemContainer>
        </PageLayout>
    );
}

export default DashboardPage;
