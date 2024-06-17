import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

function DashboardPage() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await api.get<Category[]>("categories/");

                console.log(response.data);
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
    }, []);

    return (
        <div>
            DashboardPage
            <div
                className="bg-white
                flex flex-col items-center justify-center gap-4
                w-full">
                {categories.map((category) => (
                    <p
                        className="odd:bg-gray-100 even:bg-slate-200"
                        key={category.id}>
                        {category.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default DashboardPage;
