interface CardProps {
    title: string;
    children: React.ReactNode;
}
const Card = ({ title, children }: CardProps) => {
    return (
        <div
            className="bg-white max-w-80 w-full rounded-lg overflow-hidden 
            flex flex-col items-center justify-center gap-4
            shadow-xl py-8">
            <div className="w-full">
                <h1 className="font-bold text-2xl text-center">{title}</h1>
            </div>
            <div className="overflow-y-auto flex flex-col gap-4 px-4 w-full max-h-96">
                {children}
            </div>
        </div>
    );
};

export default Card;
