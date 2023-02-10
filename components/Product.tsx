import {Database} from "../utils/database.types";
import Link from "next/link";
type TProduct = Database['public']['Tables']['products']['Row'];

interface Props {
  product: TProduct
}

export default function Product({product} : Props) {
  return <div key={product.id}>
    <h2><Link href={`/products/${product.id}`}>Name: {product.name}</Link></h2>
    {product.comments.length > 0 && <p>Rating: {product.comments.reduce((total, next) => total + next.rating, 0) / product.comments.length}</p>}
    <p>{product.created_at}</p>
  </div>
}