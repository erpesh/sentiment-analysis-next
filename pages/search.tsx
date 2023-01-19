import {Database} from "../utils/database.types";
import {useState} from "react";
import Product from "../components/Product";

type TProduct = Database['public']['Tables']['products']['Row'];
export default function Search() {

  const [products, setProducts] = useState<TProduct[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchData() {
    try {
      const res = await fetch(`/api/search?query=${searchQuery}`);
      const json = await res.json();
      console.log(await json);
      setProducts(json);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <input type={"search"} onChange={(e) => setSearchQuery(e.currentTarget.value)}/>
      <button onClick={fetchData}>Search</button>
      {products?.length ? products.map((item: TProduct) => {
        return <Product product={item} key={item.id}/>
      }) : <div>{products !== null && "No results"}</div>}
    </>
  )
}