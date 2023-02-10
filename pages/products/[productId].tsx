import React from "react";
import useProductOperations from "../../hooks/useProductOperations";

export default function Product() {

  const {
    product,
    deleteComment,
    rating,
    setRating,
    setComment,
    addComment,
    userId
  } = useProductOperations();

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div className={"container"}>
      <h2>{product.name}</h2>
      <p>{product.id}</p>
      <p>{product.created_at}</p>
      {product.comments?.map((comment) => {
        return <div key={comment.id}>
          <ul>
            <li>{comment.author.first_name && comment.author.last_name ? comment.author.first_name + " " + comment.author.last_name : "NULL"}</li>
            <li>{comment.text}</li>
            <li>{comment.rating}</li>
          </ul>
          {comment.author.id === userId && <button onClick={() => deleteComment(comment.id)}>Delete</button>}
        </div>
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