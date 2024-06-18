interface ItemCardProps {
    children: React.ReactNode;
}

const ItemCard = ({ children }: ItemCardProps) => {
    return (
        <div
            className=" bg-white overflow-hidden
            flex flex-col gap-10
            w-full sm:max-w-xs rounded-xl shadow-lg p-6 r2l">
            {children}
        </div>
    );
};

export default ItemCard;
