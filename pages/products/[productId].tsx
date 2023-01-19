import {useRouter} from "next/router";
import {Database} from "../../utils/database.types";
import React, {useEffect, useState} from "react";

type TProduct = Database['public']['Tables']['products']['Row'];
export default function Product() {

  const router = useRouter();
  const {productId} = router.query;

  const [product, setProduct] = useState<TProduct | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  async function addComment() {
    const res = await fetch(`/api/products/${productId}`,
      {
        method: "POST",
        body: JSON.stringify({
          text: comment,
          product_id: Number(productId),
          rating: rating
        })
      });
    const [json] = await res.json();
    setProduct({...product, comments: [...product!.comments, json]} as TProduct)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const json = await res.json();
        setProduct(json);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  }, [productId])

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.id}</p>
      <p>{product.created_at}</p>
      {product.comments.map((comment) => {
        return <ul key={comment.id}>
          <li>{comment.created_at}</li>
          <li>{comment.text}</li>
          <li>{comment.rating}</li>
        </ul>
      })}
      <ul style={{display: "flex", gap: "1rem"}}>
        {[1, 2, 3, 4, 5].map(num => {
          return <div
            key={num}
            onClick={() => setRating(num)}
            style={{color: rating === num ? "red" : "black", cursor: "pointer"}}
          >
            {num}
          </div>
        })}
      </ul>
      <input type={"text"} onChange={(e) => setComment(e.currentTarget.value)}/>
      <button onClick={addComment}>Comment</button>
    </div>
  )
}