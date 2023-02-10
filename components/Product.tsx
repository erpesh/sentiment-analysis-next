import {Database} from "../utils/database.types";
import Link from "next/link";
type TProduct = Database['public']['Tables']['products']['Row'];
import {AiFillStar} from "react-icons/ai";
import Rating from '@mui/material/Rating';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  product: TProduct
}

export default function Product({product} : Props) {

  const rating = product.comments.reduce((total, next) => total + next.rating, 0) / product.comments.length

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiRating-iconFilled': {
          color: '#24b47e',
        },
      },
    })
  );

  const classes = useStyles();

  return <div className={"cardContainer"} key={product.id}>
    <h2><Link href={`/products/${product.id}`}>{product.name}</Link></h2>
    <ul className={"cardDetails"}>
      <li>&#163;<span className={"cardPrice"}>{product.price}</span></li>
      {product.comments.length > 0 && <li>Rating: {rating}<AiFillStar/></li>}
      <li>Type: {product.type}</li>
      <Rating value={rating} precision={0.1} className={classes.root} readOnly/>
    </ul>
  </div>
}