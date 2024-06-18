interface ItemActionProps {
    className?: string;
    children?: React.ReactNode;
}
const ItemAction = ({ className, children }: ItemActionProps) => {
    return (
        <div className={`flex justify-between gap-2 h-11 mt-2 ${className}`}>
            {children}
        </div>
    );
};

export default ItemAction;
