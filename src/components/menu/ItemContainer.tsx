interface ItemContainerProps {
    children: React.ReactNode;
}

const ItemContainer = ({ children }: ItemContainerProps) => {
    return (
        <div
            className="bg-yellow-100 place-items-center r2l
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
        </div>
    );
};

export default ItemContainer;
