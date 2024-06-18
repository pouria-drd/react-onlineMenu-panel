interface PageHeaderProps {
    className?: string;
    children?: React.ReactNode;
}

const PageHeader = ({ className, children }: PageHeaderProps) => {
    return (
        <div
            className={`sticky top-0 bg-white/80 glas
            px-6 py-4 shadow-lg border z-10 mb-4 ${className}`}>
            {children}
        </div>
    );
};

export default PageHeader;
