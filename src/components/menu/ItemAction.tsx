interface ItemActionProps {
    children: React.ReactNode;
}
const ItemAction = ({ children }: ItemActionProps) => {
    return <div className="flex justify-between gap-2">{children}</div>;
};

export default ItemAction;
