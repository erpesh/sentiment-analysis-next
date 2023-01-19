import {Database} from "../utils/database.types";
type TProduct = Database['public']['Tables']['products']['Row'];

export default function Product({product} : {product: TProduct}) {
  return <div key={product.id}>
    <h2>Name: {product.name}</h2>
    {product.comments.length > 0 && <p>Rating: {product.comments.reduce((total, next) => total + next.rating, 0) / product.comments.length}</p>}
    <p>{product.created_at}</p>
  </div>
}