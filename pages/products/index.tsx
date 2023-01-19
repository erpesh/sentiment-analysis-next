import {Database} from "../../utils/database.types";
import {useEffect, useState} from "react";
import Product from "../../components/Product";

type TProduct = Database['public']['Tables']['products']['Row'];
export default function Products() {

  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/products`);
        const json = await res.json();
        console.log(await json);
        setProducts(json);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  }, [])

  if (!products) {
    return <p>Loading...</p>
  }

  return (
    <>
      {products.map((item: TProduct) => {
        return <Product key={item.id} product={item}/>
      })}
    </>
  )
}