interface ModalOverlayProps {
    children: React.ReactNode;
    onClose: () => void;
}

const ModalOverlay = (modalOverlayProps: ModalOverlayProps) => {
    const handleOverlayClick = () => {
        modalOverlayProps.onClose();
    };

    return (
        <div
            className="fixed top-0 left-0 inset-0 z-50 overflow-auto 
            bg-black bg-opacity-50 flex justify-center items-center"
            onClick={handleOverlayClick}>
            {modalOverlayProps.children}
        </div>
    );
};

export default ModalOverlay;
