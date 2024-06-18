interface StatusBadgeProps {
    isActive: boolean;
    className?: string;
}

const StatusBadge = ({ isActive, className }: StatusBadgeProps) => {
    return (
        <span
            className={`text-xs rounded px-4 py-1  ${
                isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
            } ${className}`}>
            {isActive ? "فعال" : "غیرفعال"}
        </span>
    );
};

export default StatusBadge;
