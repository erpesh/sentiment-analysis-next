import {Database} from "../utils/database.types";
import Link from "next/link";
type TProduct = Database['public']['Tables']['products']['Row'];
import Rating from '@mui/material/Rating';
import {useEffect, useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import useRatingStyles from "../hooks/useRatingStyles";

interface Props {
  product: TProduct
}

export default function Product({product} : Props) {

  const classes = useRatingStyles();
  const supabase = useSupabaseClient<Database>()
  const rating = product.comments.reduce((total, next) => total + next.rating, 0) / product.comments.length

  async function downloadImage(path: string) {
    try {
      const {data, error} = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log(product.image_url);
    if (product.image_url) downloadImage(product.image_url)
  }, [product.image_url])

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
      {product.comments.length > 0 && <li className={"cardRating"}>{rating}<Rating value={rating} precision={0.1} className={classes.root} readOnly/><span className={"cardNumComments"}>({product.comments.length})</span></li>}
      <li className={"cardType"}>Type: <span>{product.type}</span></li>
    </ul>
  </div>
}