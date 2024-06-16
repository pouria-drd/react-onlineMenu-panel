interface CardProps {
    title: string;
    children: React.ReactNode;
}
const Card = ({ title, children }: CardProps) => {
    return (
        <div
            className="bg-white shadow-lg rounded-lg overflow-hidden
            flex flex-col items-center justify-center gap-4
            py-14 max-w-80 w-full ">
            <div className="w-full">
                <h1 className="font-yekanX font-bold text-2xl text-center">
                    {title}
                </h1>
            </div>
            <div className="overflow-y-auto flex flex-col gap-4 px-6 py-4 w-full max-h-96">
                {children}
            </div>
        </div>
    );
};

export default Card;
