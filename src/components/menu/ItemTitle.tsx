interface ItemTitleProps {
    title: string;
}
const ItemTitle = ({ title }: ItemTitleProps) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-xl truncate">{title}</h3>
        </div>
    );
};

export default ItemTitle;
