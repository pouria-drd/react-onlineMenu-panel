interface PageHeaderProps {
    className?: string;
    children?: React.ReactNode;
}

const PageHeader = ({ className, children }: PageHeaderProps) => {
    return (
        <div
            className={`sticky top-0 bg-white/85 glass
            px-6 py-4 shadow-lg z-10 mb-4 ${className}`}>
            {children}
        </div>
    );
};

export default PageHeader;
