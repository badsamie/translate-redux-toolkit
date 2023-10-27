import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createImage,
  createProduct,
} from "../../store/products/productsActions";

const ProductCreate = () => {
  const [product, setProduct] = useState({
    title: "",
    location: "",
    price: "",
    price_dollar: "",
    education: "",
    description: "",
    count_views: 0,
    category: "",
  });
  const [image, setImage] = useState(0);
  // console.log(image);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Create Product</h3>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="location"
        onChange={(e) => setProduct({ ...product, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="education"
        onChange={(e) => setProduct({ ...product, education: e.target.value })}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="price_dollar"
        onChange={(e) =>
          setProduct({ ...product, price_dollar: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) =>
          setProduct({
            ...product,
            price: e.target.value,
          })
        }
      />
      <input
        type="text"
        placeholder="category"
        onChange={(e) =>
          setProduct({
            ...product,
            category: e.target.value,
          })
        }
      />
      <input
        type="file"
        placeholder="image"
        onChange={(e) =>
          setImage({
            ...image,
            post: e.target.value,
          })
        }
      />

      <button
        onClick={() => {
          dispatch(createProduct({ product }));
          dispatch(createImage({ product }));
          navigate("/products");
        }}
      >
        Create
      </button>
    </div>
  );
};

export default ProductCreate;
