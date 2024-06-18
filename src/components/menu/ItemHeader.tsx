interface ItemHeaderProps {
    children?: React.ReactNode;
}

const ItemHeader = ({ children }: ItemHeaderProps) => {
    return <div className="flex items-start justify-between">{children}</div>;
};

export default ItemHeader;
