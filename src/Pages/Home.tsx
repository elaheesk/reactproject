import * as React from "react";
import { useState, useEffect } from "react";
import { ProductInfo } from "../type";

import NavigationBar from '../components/NavigationBar';
import { toggleProductLike } from '../productUtils';
import '../searchBar.css';

import { useNavigate } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
const Home = () => {
    const [value, setValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<ProductInfo[]>([]);
   
    const [hideSuggestions, setHideSuggestions] = useState<boolean>(true);
    const [result, setResult] = useState<ProductInfo>();
    const [categories, setCategories] = useState<string[]>([]);

    const [displayCategories, setDisplayCategories] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<ProductInfo[]>([]);
    const likeThisProduct = React.useCallback((id: number) => {
        toggleProductLike(filteredProducts, id, setFilteredProducts);
    }, [filteredProducts]); // Dependency on filteredProducts

    const navigate = useNavigate();
    const findResult = (title: string) => {
        var foundResult = suggestions.find((suggestion) => suggestion.title === title);
        setResult(foundResult);
        if (result) {
            navigate(`/products/${foundResult?.id}`);
        }
    };
   


    const chooseCategory = async (category: string) => {
        try {
            const response = await fetch(
                "https://dummyjson.com/products"
            );
            const data = await response.json();
            const filtered = data.products.filter((product: ProductInfo) =>
                product.category.toLowerCase() === category.toLowerCase());
            if (JSON.stringify(filtered) !== JSON.stringify(filteredProducts)) {
                setFilteredProducts(filtered);
            }
        

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
       
        const fetchSuggestions = async () => {
            try {
                const response = await fetch(
                    `https://dummyjson.com/products/search?q=${value}`
                );
                const data = await response.json();

                setSuggestions(data.products);
            } catch (error) {
                console.log(error);
            }
        };
        const toggleHideSuggestions = () => {
            if (value) {
                setHideSuggestions(false);
            } else {
                setHideSuggestions(true);
            }
        }
        toggleHideSuggestions();
        fetchSuggestions();


    }, [value]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://dummyjson.com/products"
                );
                const data = await response.json();
                setCategories(Array.from(new Set(data.products.map((product: ProductInfo) => product.category))));
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [])
    return (
        <div className="parent">
            <NavigationBar />
            <div className="topBar">
                <SearchBar suggestions={suggestions} value={value} setValue={setValue} hideSuggestions={hideSuggestions} findResult={findResult} />
                <div>
                    <button onClick={() => setDisplayCategories(!displayCategories)} type="button" className="filterBtn">Filter</button>
                    <button style={{ display: displayCategories && filteredProducts.length > 0 ? "flex" : "none" }} className="clearFilterBtn" onClick={() => setFilteredProducts([])} type="button">Clear filter</button>
                    {displayCategories && categories.map((category: string, index: number) =>
                        <div key={index} onClick={() => chooseCategory(category)}>{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                    )}
                </div>
            </div>
            {filteredProducts.length > 0 && filteredProducts.map((prod) =>
                <div key={prod.id}>
                    <Products  product={prod} likeThisProduct={likeThisProduct} />
                  
                </div>
            )}
        </div>
    )
}
export default Home;