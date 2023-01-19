import {Database} from "../../utils/database.types";
import {useEffect, useState} from "react";

type TProduct = Database['public']['Tables']['products']['Row'];
export default function Product() {

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
        return <div key={item.created_at}>
          <h2>{item.name}</h2>
          <p>{item.id}</p>
          <p>{item.created_at}</p>
        </div>
      })}
    </>
  )
}