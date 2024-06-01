import { useParams } from "react-router-dom";

// product details page
const ProductDetails = () => {
  const { id } = useParams();
  return <div>this is the product detail page of {id}</div>;
};
export default ProductDetails;
