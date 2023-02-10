import {Database} from "../utils/database.types";
import {useEffect, useState} from "react";
import Product from "../components/Product";
import {AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/router";

type TProduct = Database['public']['Tables']['products']['Row'];
export default function Search() {

  const router = useRouter();
  const [products, setProducts] = useState<TProduct[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  function searchSubmit(){
    router.push({pathname: "search", query: {query: searchQuery}})
  }

  async function getSearchResults() {
    if (!router.query.query) getProducts();
    else {
      try {
        const res = await fetch(`/api/search?query=${router.query.query}`);
        const json = await res.json();
        setProducts(json);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getProducts() {
    try {
      const res = await fetch(`/api/products`);
      const json = await res.json();
      setProducts(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSearchResults();
  }, [router])

  return (
    <div className={"container searchWrap"}>
      <div className={"searchContainer"}>
        <div className={"searchProducts"}>
          <label>Search for products</label>
          <form onSubmit={(e) => {
            e.preventDefault();
            searchSubmit();
          }} className={"searchInputContainer"}>
            <input type={"search"} placeholder={"Search for products"} onChange={e => setSearchQuery(e.currentTarget.value)}/>
            <button type={"submit"} className={"searchButton"}><AiOutlineSearch/></button>
          </form>
        </div>
        <div className={"productsContainer"}>
          {products?.length ? products.map((item: TProduct) => {
            return <Product product={item} key={item.id}/>
          }) : <div>{products !== null && "No results"}</div>}
        </div>
      </div>
      <aside>

      </aside>
    </div>
  )
}