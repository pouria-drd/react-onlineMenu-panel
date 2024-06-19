import { ChangeEvent, useState } from "react";
import { Button, Checkbox, Input } from "../ui";
import { useToast } from "../ui/toast/ToastProvider";

import api from "../../api/axiosInstance";
import ImageDropzone from "../ImageDropzone";

type ProductFormProps = {
    onFailed?: () => void;
    onSuccess?: () => void;
    categoryId: string;
} & (
    | {
          method: "patch";
          product: Product;
      }
    | {
          method: "post";
      }
);

const ProductForm = (props: ProductFormProps) => {
    const { showToast } = useToast();

    const [isSendingData, setIsSendingData] = useState<boolean>(false);

    const [productData, setProductData] = useState<ProductFormData>({
        name: props.method === "post" ? "" : props.product.name,
        price: props.method === "post" ? "" : props.product.price,
        icon: null,
        isActive: props.method === "post" ? true : props.product.isActive,
    });

    const handleIconSelection = (file: File) => {
        setProductData((prevData) => ({ ...prevData, icon: file }));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateProduct = async () => {
        setIsSendingData(true);

        try {
            const formData = new FormData();

            formData.append("name", productData.name);
            formData.append("price", String(productData.price));
            formData.append("isActive", String(productData.isActive));

            if (productData.icon) {
                formData.append("icon", productData.icon);
            }

            const response = await api.post(
                `categories/${props.categoryId}/products/`,
                formData
            );

            // console.log(response);

            if (response.status === 201) {
                props.onSuccess?.();
                showToast("محصول جدید ایجاد شد!", "success", "عملیات موفق");
            }
        } catch (error: any) {
            // console.log(error);
            props.onFailed?.();
            showToast("محصول ایجاد نشد!", "danger", "خطا");
        }

        setIsSendingData(false);
    };

    const handlePatchProduct = async () => {
        setIsSendingData(true);

        try {
            const formData = new FormData();
            formData.append("name", productData.name);
            formData.append("price", String(productData.price));
            formData.append("isActive", String(productData.isActive));

            if (productData.icon) {
                formData.append("icon", productData.icon);
            }

            const response = await api.patch(
                `categories/${props.categoryId}/products/${
                    props.method === "patch" && props.product.id
                }/`,
                formData
            );

            // console.log(response);

            if (response.status === 200) {
                props.onSuccess?.();
                showToast("محصول بروزرسانی شد!", "success", "عملیات موفق");
            }
        } catch (error: any) {
            // console.log(error);
            props.onFailed?.();
            showToast("محصول بروزرسانی نشد!", "danger", "خطا");
        }

        setIsSendingData(false);
    };

    return (
        <div className="flex flex-col gap-4 py-4">
            <Input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="نام محصول"
            />

            <Input
                type="tel"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="قیمت محصول"
            />

            <Checkbox
                label="فعال است"
                defaultChecked={productData.isActive}
                onChange={(value) => {
                    setProductData((prevData) => ({
                        ...prevData,
                        isActive: value,
                    }));
                }}
            />

            <ImageDropzone onFileSelected={handleIconSelection} />

            <Button
                onClick={
                    props.method === "post"
                        ? handleCreateProduct
                        : handlePatchProduct
                }
                disabled={
                    productData.name.length < 3 ||
                    (productData.price as number) < 1 ||
                    isSendingData
                }>
                {props.method === "post" ? "ایجاد محصول" : "بروزرسانی"}
            </Button>
        </div>
    );
};

export default ProductForm;
