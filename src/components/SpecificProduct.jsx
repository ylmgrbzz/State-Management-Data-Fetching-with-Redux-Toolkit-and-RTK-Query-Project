import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../app/service/dummyData";

const SpecificProduct = () => {
  const { productId } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.thumbnail} alt={product.title} />
    </div>
  );
};

export default SpecificProduct;
