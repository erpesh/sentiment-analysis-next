import {Database} from "../utils/database.types";
import {useEffect, useState} from "react";
import Product from "../components/Product";
import {AiOutlineSearch} from "react-icons/ai";

type TProduct = Database['public']['Tables']['products']['Row'];
export default function Search() {

  const [products, setProducts] = useState<TProduct[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  async function getSearchResults() {
    try {
      const res = await fetch(`/api/search?query=${searchQuery}`);
      const json = await res.json();
      console.log(await json);
      setProducts(json);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    try {
      const res = await fetch(`/api/products`);
      const json = await res.json();
      console.log(await json);
      setProducts(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className={"container"}>
      <div className={"productsSearch"}>
        <input placeholder={"Search for products"} type={"search"} onChange={(e) => setSearchQuery(e.currentTarget.value)}/>
        <button onClick={getSearchResults}><AiOutlineSearch/></button>
      </div>
      <div className={"searchProducts"}>
        <div className={"inputContainer"}>
          <label>Search for products</label>
          <input type={"search"} placeholder={"Search for products"} onChange={e => setSearchQuery(e.currentTarget.value)}/>
        </div>
        <button className={"button"}>Search</button>
      </div>
      {products?.length ? products.map((item: TProduct) => {
        return <Product product={item} key={item.id}/>
      }) : <div>{products !== null && "No results"}</div>}
    </div>
  )
}