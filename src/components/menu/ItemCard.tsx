interface ItemCardProps {
    children: React.ReactNode;
}

const ItemCard = ({ children }: ItemCardProps) => {
    return (
        <div
            className=" bg-white overflow-hidden
            flex flex-col gap-4
            w-full max-w-xs rounded shadow-lg p-6 r2l">
            {children}
        </div>
    );
};

export default ItemCard;
