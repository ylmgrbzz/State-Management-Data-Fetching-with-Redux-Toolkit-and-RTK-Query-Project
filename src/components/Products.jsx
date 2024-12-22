import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../app/service/dummyData";

const Products = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  const handleAddProduct = async () => {
    const newProduct = { title: "BMW Pencil" };
    const addedProduct = await addProduct(newProduct).unwrap();
    setProducts((prev) => [...prev, addedProduct]);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setUpdatedTitle(product.title);
  };

  const handleUpdate = async () => {
    await updateProduct({ id: editingProduct.id, title: updatedTitle });
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProduct.id
          ? { ...product, title: updatedTitle }
          : product
      )
    );
    setEditingProduct(null);
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <>
          <h1>Products</h1>
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                {product.title}
                <button onClick={() => handleEdit(product)}>Update</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {editingProduct && (
            <div>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingProduct(null)}>Cancel</button>
            </div>
          )}
          <button onClick={handleAddProduct}>Add Product</button>
        </>
      )}
    </div>
  );
};

export default Products;
