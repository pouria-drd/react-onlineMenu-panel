import CloseIcon from "./icons/CloseIcon";

interface ToastBodyProps {
    message: string | undefined;
    onClose: () => void;
}

const ToastBody = (toastBodyProps: ToastBodyProps) => {
    const handleOnClose = () => {
        toastBodyProps.onClose();
    };

    return (
        <div className="flex items-center justify-between w-full">
            <h3 className="font-semibold text-lg w-full">
                {toastBodyProps.message}
            </h3>
            <button onClick={handleOnClose}>
                <CloseIcon />
            </button>
        </div>
    );
};

export default ToastBody;
