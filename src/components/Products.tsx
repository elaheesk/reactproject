import { Link } from 'react-router-dom';
import { ProductInfo } from "../type";
import { toggleProductLike } from '../productUtils';
import React, { useEffect, useState } from 'react';

const Products = React.memo(({ product, likeThisProduct }: { product: ProductInfo, likeThisProduct: (id: number) => void }) => {
    useEffect(() => {
        console.log("Child component rerendering");
    }, [])
    return (
        <div className="flex flex-row basis-1/3 border-solid border-2 p-2 my-2">{product.title}
            <button style={{ backgroundColor: product.liked ? "red" : "transparent" }} onClick={() => likeThisProduct(product.id)}>Like</button>
            <Link to={`/products/${product.id}`}>Read more</Link>
        </div>
    )
});
export default Products;