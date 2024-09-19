// productUtils.ts
import { ProductInfo } from './type';  // Adjust the import path based on your project

export const toggleProductLike = (
    products: ProductInfo[],
    id: number,
    setProducts: React.Dispatch<React.SetStateAction<ProductInfo[]>>
) => {
    const updatedProducts = products.map((product: ProductInfo) => {
        if (product.id === id) {
            return { ...product, liked: !product.liked };
        } else {
            return product;
        }
    });

    setProducts(updatedProducts);
    localStorage.setItem('likedProducts', JSON.stringify(updatedProducts));
};
