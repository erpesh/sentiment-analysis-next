import {Database, ProductTypes} from "../utils/database.types";
import {useEffect, useState} from "react";
import Product from "../components/Product";
import {AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/router";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type TProduct = Database['public']['Tables']['products']['Row'];
export default function Search() {

  const MIN_PRICE = 1;
  const MAX_PRICE = 5000;

  const router = useRouter();
  const [products, setProducts] = useState<TProduct[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [priceRange, setPriceRange] = useState([10, 500])

  function searchSubmit() {
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

  const brandStyle = {
    backgroundColor: '#24b47e',
    border: '1px solid #24b47e',
  };

  const blackStyle = {
    backgroundColor: '#101010',
    border: '1px solid #101010',
  }

  function inputOnchange(range: number[], setRange: (range: number[]) => void, value: number, isFirst: boolean) {
    let _range = [...range];
    _range[Number(!isFirst)] = value;
    setRange(_range);
  }

  return (
    <div className={"container"}>
      <div className={"searchProducts"}>
        <label>Search for products</label>
        <form onSubmit={(e) => {
          e.preventDefault();
          searchSubmit();
        }} className={"searchInputContainer"}>
          <input type={"search"} placeholder={"Search for products"}
                 onChange={e => setSearchQuery(e.currentTarget.value)}/>
          <button type={"submit"} className={"searchButton"}><AiOutlineSearch/></button>
        </form>
      </div>
      <div className={"searchContainer searchWrap"}>
        <div className={"productsContainer"}>
          {products?.length ? products.map((item: TProduct) => {
            return <Product product={item} key={item.id}/>
          }) : <div>{products !== null && "No results"}</div>}
        </div>
        <aside>
          <h3>Filters</h3>
          <div className={"filterType"}>
            <span>Type</span>
            <ul>
              {ProductTypes.map(type => {
                return <li key={type}>{type}</li>
              })}
            </ul>
          </div>
          <div className={"filterPrice"}>
            <span>Price</span>
            <div className={"sliderContainer"}>
              <input
                type={"number"}
                value={priceRange[0].toString()}
                min={MIN_PRICE}
                max={MAX_PRICE}
                onChange={e => inputOnchange(priceRange, setPriceRange, Number(e.currentTarget.value), true)}/>
              <Slider
                range
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={priceRange}
                onChange={(numbers) => {
                  if (Array.isArray(numbers)) {
                    setPriceRange(numbers);
                  }
                }}
                handleStyle={blackStyle}
                railStyle={brandStyle}
                trackStyle={brandStyle}
              />
              <input
                type={"number"}
                value={priceRange[1].toString()}
                min={MIN_PRICE}
                max={MAX_PRICE}
                onChange={e => inputOnchange(priceRange, setPriceRange, Number(e.currentTarget.value), false)}/>
            </div>
          </div>
          {/*<div className={"filterRating"}>*/}
          {/*  <span>Rating</span>*/}
          {/*  <Slider*/}
          {/*    range*/}
          {/*    min={1}*/}
          {/*    max={5000}*/}
          {/*    value={priceRange}*/}
          {/*    onChange={(numbers)=> {*/}
          {/*      if (Array.isArray(numbers) ){*/}
          {/*        setPriceRange(numbers);*/}
          {/*      }*/}
          {/*    }}*/}
          {/*    handleStyle={blackStyle}*/}
          {/*    railStyle={brandStyle}*/}
          {/*    trackStyle={brandStyle}*/}
          {/*  />*/}
          {/*</div>*/}
        </aside>
      </div>
    </div>
  )
}