import defaultImage from "../../assets/images/DefaultImage.png";

interface ItemIconProps {
    altName: string;
    iconUrl?: string;
}

const ItemIcon = ({ altName, iconUrl }: ItemIconProps) => {
    return (
        <img
            loading="lazy"
            className="size-24 rounded-lg"
            src={iconUrl ? iconUrl : defaultImage}
            alt={`${altName} icon`}
        />
    );
};

export default ItemIcon;
