import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ProductInfo } from "../type";
import { toggleProductLike } from '../productUtils';
import Products from "../components/Products";
const ShoppingList: React.FC = () => {
    const [products, setProducts] = useState<ProductInfo[]>([]);


    const likeThisProduct = (id: number) => {
        toggleProductLike(products, id, setProducts);  
    };
    const sortAscending = () => {
        const strAscending = [...products].sort((a, b) =>
            a.title > b.title ? 1 : -1,
        );
        setProducts(strAscending);
    }
    const sortDescending = () => {
        const strDescending = [...products].sort((a, b) =>
            a.title > b.title ? -1 : 1,
        );
        setProducts(strDescending);
    }

    useEffect(() => {
        const fetchClothes = async () => {
            const resp = await fetch("https://dummyjson.com/products");
            const data = await resp.json();
            const savedLikes = localStorage.getItem('likedProducts');
            const savedLikedProducts = savedLikes ? JSON.parse(savedLikes) : [];
            const newPropertyAdded = data.products.map((eachProduct: ProductInfo) => {
                const savedProduct = savedLikedProducts.find((p: ProductInfo) => p.id === eachProduct.id);
                return { ...eachProduct, liked: savedProduct?.liked ?? false };
            });
            console.log(newPropertyAdded);
            setProducts(newPropertyAdded);
        }
        fetchClothes();


    }, [])

    return (
        <div className="container">
            <div className="bg-slate-300">
                <Link to="/">Back to home</Link>
                <button type="button" onClick={() => sortAscending()}>A-Z</button>
                <button type="button" onClick={() => sortDescending()}>Z-A</button>
            </div>
            {products.length > 0 && products.map((product: ProductInfo) =>
                <Products key={product.id} product={product} likeThisProduct={likeThisProduct} />
            )}
        </div>
    )
}
export default ShoppingList;