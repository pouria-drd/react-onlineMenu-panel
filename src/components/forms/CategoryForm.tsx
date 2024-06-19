import { ChangeEvent, useState } from "react";
import { Button, Checkbox, Input } from "../ui";
import { useToast } from "../ui/toast/ToastProvider";

import api from "../../api/axiosInstance";
import ImageDropzone from "../ImageDropzone";

type CategoryFormProps = {
    onFailed?: () => void;
    onSuccess?: () => void;
} & (
    | {
          method: "patch";
          category: Category;
      }
    | {
          method: "post";
      }
);

const CategoryForm = (props: CategoryFormProps) => {
    const { showToast } = useToast();

    const [isSendingData, setIsSendingData] = useState<boolean>(false);

    const [categoryData, setCategoryData] = useState<CategoryFormData>({
        name: props.method === "post" ? "" : props.category.name,
        icon: null,
        isActive: props.method === "post" ? true : props.category.isActive,
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
        setIsSendingData(true);

        try {
            const formData = new FormData();

            formData.append("name", categoryData.name);
            formData.append("isActive", String(categoryData.isActive));

            if (categoryData.icon) {
                formData.append("icon", categoryData.icon);
            }

            const response = await api.post("categories/", formData);

            // console.log(response);

            if (response.status === 201) {
                props.onSuccess?.();
                showToast("دسته بندی جدید ایجاد شد!", "success", "عملیات موفق");
            }
        } catch (error: any) {
            // console.log(error);
            props.onFailed?.();
            showToast("دسته بندی ایجاد نشد!", "danger", "خطا");
        }

        setIsSendingData(false);
    };

    const handlePatchCategory = async () => {
        setIsSendingData(true);

        try {
            const formData = new FormData();

            formData.append("name", categoryData.name);
            formData.append("isActive", String(categoryData.isActive));

            if (categoryData.icon) {
                formData.append("icon", categoryData.icon);
            }

            const response = await api.patch(
                `categories/${props.method === "patch" && props.category.id}/`,
                formData
            );

            // console.log(response);

            if (response.status === 200) {
                props.onSuccess?.();
                showToast("دسته بندی بروزرسانی شد!", "success", "عملیات موفق");
            }
        } catch (error: any) {
            // console.log(error);
            props.onFailed?.();
            showToast("دسته بندی بروزرسانی نشد!", "danger", "خطا");
        }

        setIsSendingData(false);
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
                onClick={
                    props.method === "post"
                        ? handleCreateCategory
                        : handlePatchCategory
                }
                disabled={categoryData.name.length < 3 || isSendingData}>
                {props.method === "post" ? "ایجاد دسته" : "بروزرسانی"}
            </Button>
        </div>
    );
};

export default CategoryForm;
