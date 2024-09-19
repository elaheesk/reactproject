import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductInfo, ProductReview } from "../type";
import '../searchBar.css';
import Form from "../components/Form";
interface RouteParams extends Record<string, string | undefined> {
    id: string;
}
const Product = () => {
    const { id } = useParams<RouteParams>();
    const [product, setProduct] = useState<ProductInfo>();
   

    //const addReviewCallback = (newReview: ProductReview) => {
    //    setProduct((prevProduct: Product) => ({
    //        ...prevProduct,
    //        reviews: [...prevProduct.reviews, newReview],
    //    }));
    //};


    useEffect(() => {
        const fetchClothe = async () => {
            const resp = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await resp.json();
            console.log("Single item:", data);
            console.log("product", product?.reviews);
            setProduct(data);
        }

        fetchClothe();

    }, [])
 
  



   
    return (
        <div>
            <Link to="/products">Back</Link>
            {product && (
                <div>
                    <h2>{product.title}</h2>
                    <img alt="clothe" src={product?.thumbnail} />
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>

                    <h3>Reviews: {product.reviews &&
                        product.reviews.map((rev: ProductReview,index) =>
                            <div key={index } style={{ border: "1px solid grey", margin: "5px" }}>
                           {/*     <p>{new Date(rev.date).toISOString().split('T')[0]}</p>*/}
                                <p>{rev.reviewerName} commented:{rev.comment}</p>
                                <p>Rating:{rev.rating}</p>


                            </div>
                        )}</h3>
                    <div>
                        <Form product={ product} />
                        

                    </div>
                </div>
            )}
        </div>
    )
}
export default Product;