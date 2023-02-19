import {Database} from "../utils/database.types";
import Link from "next/link";
import Rating from '@mui/material/Rating';
import {useEffect, useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import useRatingStyles from "../hooks/useRatingStyles";
import useProductImage from "../hooks/useProductImage";

type TProduct = Database['public']['Tables']['products']['Card'];

interface Props {
  product: TProduct
}

export default function Product({product} : Props) {

  const classes = useRatingStyles();

  const imageUrl = useProductImage(product.image_url);

  return <div className={"cardContainer"}>
    <div className={"productImageWrap"}>
      <Link href={`/products/${product.id}`}><img
        src={imageUrl!}
        alt="Avatar"
        className="avatar image"
      /></Link>
    </div>
    <ul className={"cardDetails"}>
      <li><h2 className={"cardName"}><Link href={`/products/${product.id}`}>{product.name}</Link></h2></li>
      <li className={"cardPriceLine"}>&#163;<span className={"cardPrice"}>{product.price}</span></li>
      {product.num_comments > 0 && <li className={"cardRating"}>{product.rating}<Rating value={product.rating} precision={0.1} className={classes.root} readOnly/><span className={"cardNumComments"}>({product.num_comments})</span></li>}
      <li className={"cardType"}>Type: <span>{product.type}</span></li>
    </ul>
  </div>
}