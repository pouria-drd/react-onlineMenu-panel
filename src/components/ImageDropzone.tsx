import { ChangeEvent, useRef, useState, DragEvent, useEffect } from "react";

interface ImageDropzoneProps {
    onFileSelected: (file: File) => void;
}

const ImageDropzone = ({ onFileSelected }: ImageDropzoneProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const validateFile = (file: File): boolean => {
        const validTypes = ["image/png", "image/jpg", "image/jpeg"];
        const maxSize = 1 * 1024 * 1024; // 1MB in bytes

        if (!validTypes.includes(file.type)) {
            setError("فقط فایل‌های .png, .jpg, .jpeg مجاز هستند.");
            return false;
        }

        if (file.size > maxSize) {
            setError("حداکثر حجم فایل 1MB است.");
            return false;
        }

        setError(null);
        return true;
    };

    // Handle the change event when a file is selected
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (validateFile(file)) {
                setPreviewUrl(URL.createObjectURL(file));
                onFileSelected(file);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    // Function to trigger the file input dialog
    const onChooseFile = () => {
        inputRef.current?.click();
    };

    // Handle drag over event
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // Handle file drop event
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            if (validateFile(file)) {
                setPreviewUrl(URL.createObjectURL(file));
                onFileSelected(file);
            } else {
                setPreviewUrl(null);
            }
            event.dataTransfer.clearData();
        }
    };

    // Clean up the URL object when the component unmounts or when a new file is selected
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={onChooseFile}
            className={`bg-gray-50 text-sm text-center flex flex-col items-center justify-center
            border-2 border-dashed border-gray-300 rounded-xl p-5 h-32 ${
                isDragging ? "bg-blue-50 border-blue-400" : ""
            }`}>
            <input
                ref={inputRef}
                onChange={handleOnChange}
                className="hidden"
                type="file"
                accept=".png, .jpg, .jpeg"
            />

            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-auto object-contain"
                />
            ) : (
                <p className="text-sm">
                    {isDragging
                        ? "فایل را رها کتید"
                        : "فایلی را انتخاب کنید یا در اینجا بکشید"}
                </p>
            )}

            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default ImageDropzone;
