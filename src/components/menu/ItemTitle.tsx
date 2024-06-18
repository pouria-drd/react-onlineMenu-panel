interface ItemTitleProps {
    title: string;
    children?: React.ReactNode;
}
const ItemTitle = ({ title, children }: ItemTitleProps) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-xl truncate">{title}</h3>
            {children}
        </div>
    );
};

export default ItemTitle;
