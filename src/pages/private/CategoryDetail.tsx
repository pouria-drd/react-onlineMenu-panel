import { useParams } from "react-router-dom";

const CategoryDetail = () => {
    const { categoryId } = useParams();

    return (
        <div>
            <h1>Category Detail</h1>
            <p>Category ID: {categoryId}</p>
            {/* Add more logic to display category details based on categoryId */}
        </div>
    );
};

export default CategoryDetail;
