import React from "react";
import useProductOperations from "../../hooks/useProductOperations";
import useProfile from "../../hooks/useProfile";
import useProductImage from "../../hooks/useProductImage";
import Rating from "@mui/material/Rating";
import useRatingStyles from "../../hooks/useRatingStyles";

export default function Product() {

  const {
    product,
    deleteComment,
    rating,
    setRating,
    setComment,
    addComment,
    deleteProduct,
    userId
  } = useProductOperations();

  const {profile} = useProfile();
  const classes = useRatingStyles();
  const imageUrl = useProductImage(product?.image_url);

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div className={"container"}>
      <div className={"productData"}>
        {imageUrl && <div className={"productImageContainer"}>
          <img alt={product.name} src={imageUrl}/>
        </div>}
        <div className={"productInfo"}>
          <h1>{product.name}</h1>
          {product.num_comments > 0 && <div>{product.rating}<Rating value={product.rating} precision={0.1} className={classes.root} readOnly/><span className={"cardNumComments"}>({product.num_comments})</span></div>}
          <p>Price: &#163;{product.price}</p>
          <p>Type: {product.type}</p>
          {product.comments.length > 0 && <p>Rating: {product.comments.reduce((total, next) => total + next.rating, 0) / product.comments.length}</p>}
          <button onClick={deleteProduct}>Delete Product</button>
        </div>
      </div>
      <h3>Comments</h3>
      {product.comments?.map((comment) => {
        return <div key={comment.id}>
          <ul>
            <li>{comment.author.first_name && comment.author.last_name ? comment.author.first_name + " " + comment.author.last_name : "NULL"}</li>
            <li>{comment.text}</li>
            <li>{comment.rating}</li>
          </ul>
          {(profile?.isAdmin || comment.author.id === userId) && <button onClick={() => deleteComment(comment.id)}>Delete</button>}
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