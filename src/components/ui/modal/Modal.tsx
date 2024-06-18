import CloseIcon from "./icons/CloseIcon";
import ModalOverlay from "./ModalOverlay";

interface ModalProps {
    title?: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const Modal = (modalProps: ModalProps) => {
    const title = modalProps.title || "Title";

    const handleCloseModal = () => {
        modalProps.onClose();
    };

    const stopPropagation = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

    return (
        <ModalOverlay onClose={handleCloseModal}>
            <div
                onClick={stopPropagation}
                className="bg-white cursor-default
                flex flex-col items-center justify-center gap-4
                w-full max-w-xs rounded-lg p-4">
                <div className="flex items-center justify-between gap-2 w-full">
                    <button onClick={handleCloseModal}>
                        <CloseIcon />
                    </button>
                    <h3 className="text-xl">{title}</h3>
                </div>

                <div className="w-full">{modalProps.children}</div>
            </div>
        </ModalOverlay>
    );
};

export default Modal;
