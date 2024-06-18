import moment from "jalali-moment";

interface DateBadgeProps {
    createdAt: Date;
    updatedAt: Date;
}

const DateBadge = ({ createdAt, updatedAt }: DateBadgeProps) => {
    const formatDate = (date: Date) => {
        return moment(date).locale("fa").format("YYYY/MM/DD HH:mm");
    };

    return (
        <div className="text-gray-400 text-sm">
            <p>بروزرسانی: {formatDate(updatedAt)}</p>
            <p>ایحاد شده در: {formatDate(createdAt)}</p>
        </div>
    );
};

export default DateBadge;
