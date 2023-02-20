import React from "react";
import useProductOperations from "../../hooks/useProductOperations";
import useProfile from "../../hooks/useProfile";
import useProductImage from "../../hooks/useProductImage";
import Rating from "@mui/material/Rating";
import useRatingStyles from "../../hooks/useRatingStyles";
import {AiFillDelete, AiFillStar} from "react-icons/ai";

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

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-UK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

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
          {product.num_comments > 0 &&
            <div className={"productRating"}>{product.rating}
              <Rating value={product.rating} precision={0.1} className={classes.root} readOnly/>
              <span className={"cardNumComments"}>
                ({product.num_comments})
              </span>
            </div>}
          <p>Price: <span>&#163;{product.price}</span></p>
          <p>Type: <span>{product.type}</span></p>
          {profile?.isAdmin &&
            <button className={"deleteProductButton"} onClick={deleteProduct}>Delete Product</button>}
        </div>
      </div>
      <div className={"filterType"} style={{marginBottom: "1rem"}}>
        <span>Comments</span>
      </div>
      <div className={"leaveCommentContainer"}>
          <span style={{display: "flex", gap: ".2rem", marginBottom: ".5rem"}}>{[1, 2, 3, 4, 5].map(num => {
            return <div
              key={num}
              onClick={() => setRating(num)}
              style={{cursor: "pointer"}}
            >
              <AiFillStar fill={rating && rating >= num ? "#24b47e" : "black"} size={24}/>
            </div>
          })}</span>
        <textarea onChange={(e) => setComment(e.currentTarget.value)}/>
        <button className={"button"} style={{width: "7rem", marginTop: ".75rem"}} onClick={addComment}>Comment</button>
      </div>
      {product.comments?.map((comment) => {
        return <div className={"commentContainer"} key={comment.id}>
          <div>
            <span style={{fontSize: "20px", fontWeight: "bold"}}>
              {comment.author.first_name &&
              comment.author.last_name ? comment.author.first_name + " " + comment.author.last_name : "NULL"}
            </span>
            <div>
              <Rating value={comment.rating} precision={1} className={classes.root} readOnly/>
            </div>
            <span>{formatDate(comment.created_at)}</span>
            <p style={{fontSize: "19px"}}>{comment.text}</p>
          </div>
          {(profile?.isAdmin || comment.author.id === userId) &&
            <button className={"deleteKeyword"} onClick={() => deleteComment(comment.id)}><AiFillDelete/></button>}
        </div>
      })}
    </div>
  )
}