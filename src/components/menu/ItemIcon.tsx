import defaultImage from "../../assets/images/DefaultImage.png";

interface ItemIconProps {
    altName: string;
    iconUrl?: string;
}

const ItemIcon = ({ altName, iconUrl }: ItemIconProps) => {
    return (
        <img
            loading="lazy"
            className="size-20"
            src={iconUrl ? iconUrl : defaultImage}
            alt={`${altName} icon`}
        />
    );
};

export default ItemIcon;
