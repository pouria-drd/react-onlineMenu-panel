import { ChangeEvent, useState } from "react";
import { Button, Checkbox, Input } from "../ui";
import { useToast } from "../ui/toast/ToastProvider";

import api from "../../api/axiosInstance";
import ImageDropzone from "../ImageDropzone";

interface NewCategoryFormProps {
    onFailed?: () => void;
    onSuccess?: () => void;
}

const NewCategoryForm = ({ onFailed, onSuccess }: NewCategoryFormProps) => {
    const { showToast } = useToast();

    const [categoryData, setCategoryData] = useState<CategoryFormData>({
        name: "",
        icon: null,
        isActive: true,
    });

    const handleIconSelection = (file: File) => {
        setCategoryData((prevData) => ({ ...prevData, icon: file }));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateCategory = async () => {
        try {
            const formData = new FormData();
            formData.append("name", categoryData.name);
            if (categoryData.icon) {
                formData.append("icon", categoryData.icon);
            }
            formData.append("isActive", String(categoryData.isActive));

            const response = await api.post("categories/", formData);

            // console.log(response);

            if (response.status === 201) {
                onSuccess?.();
                showToast("دسته بندی جدید ایجاد شد!", "success", "عملیات موفق");
            }
        } catch (error: any) {
            // console.log(error);
            onFailed?.();
            showToast("دسته بندی ایجاد نشد!", "danger", "خطا");
        }
    };

    return (
        <div className="flex flex-col gap-4 py-4">
            <Input
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleInputChange}
                placeholder="نام دسته"
            />

            <Checkbox
                label="فعال است"
                defaultChecked={categoryData.isActive}
                onChange={(value) => {
                    setCategoryData((prevData) => ({
                        ...prevData,
                        isActive: value,
                    }));
                }}
            />

            <ImageDropzone onFileSelected={handleIconSelection} />

            <Button
                onClick={handleCreateCategory}
                disabled={categoryData.name.length < 3}>
                ثبت
            </Button>
        </div>
    );
};

export default NewCategoryForm;
