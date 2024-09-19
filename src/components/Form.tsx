import React, { useState } from "react";
import { ProductInfo, ProductReview,FormProps } from "../type";

const Form: React.FC<FormProps> = ({ product }) => {
    const [comment, setComment] = useState<string>('');
    const [userNameVal, setUserNameVal] = useState<string>('');
    const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);
    const ratingOptions = [0, 1, 2, 3, 4, 5];
    const today = new Date();  
    const year = today.getFullYear();  
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0'); 

    const formattedDate = `${year}-${month}-${day}`;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const test = {
            comment: comment,
            date: formattedDate,
            rating: selectedRating,
            reviewerEmail: "",
            reviewerName: userNameVal,
        }
        if (product && product.reviews) {
            const updatedReviews = [...product.reviews, test];
            const updatedProduct = { ...product, reviews: updatedReviews };
        /*    setProduct(updatedProduct);*/
            console.log(updatedProduct);
            setSelectedRating(0);
            setUserNameVal("");
            setComment("");
        }
    }
    const selectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10); // Convert the value to a number
        setSelectedRating(value); // Update the state
    }
    return (
        <form onSubmit={handleSubmit}>
        <div className="reviewContainer">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserNameVal(e.target.value)} />

            <label>write your comment here:  </label>
            <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setComment(e.target.value)
            }>
            </textarea>

            <label htmlFor="rating">Rating:</label>
            <select id="rating" name="rating" value={selectedRating} onChange={selectOption}>
                {ratingOptions.map((option: number) =>
                    <option key={option} value={option}>{option}</option>
                )}

            </select>

            <button type="submit" onClick={(e) => handleSubmit}>Write review</button>
        </div>
        </form>
    )
}
export default Form;