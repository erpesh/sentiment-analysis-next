import {Database, ProductTypes, SortOptions, TCheckbox} from "../utils/database.types";
import {useEffect, useState} from "react";
import Product from "../components/Product";
import {AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/router";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type TProduct = Database['public']['Tables']['products']['Row'];
export default function Search() {

  const MIN_PRICE = 1;
  const MAX_PRICE = 1000;

  const router = useRouter();
  const [products, setProducts] = useState<TProduct[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TCheckbox[]>(ProductTypes);
  const [sortFilter, setSortFilter] = useState<TCheckbox[]>(SortOptions);

  const [priceRange, setPriceRange] = useState([10, 100]);
  const [ratingRange, setRatingRange] = useState([4, 5]);

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
          <div className={"filterType"}>
            <span>Type</span>
            <ul>
              {typeFilter.map(type => {
                return <li key={type.name}>
                  <input checked={type.isChecked} autoComplete={"off"} type={"checkbox"}/>
                  <span>{type.name}</span>
                </li>
              })}
            </ul>
          </div>
          <div className={"filterType"}>
            <span>Price</span>
            <div className={"sliderContainer"}>
              <input
                className={"rangeInput"}
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
                className={"rangeInput"}
                type={"number"}
                value={priceRange[1].toString()}
                min={MIN_PRICE}
                max={MAX_PRICE}
                onChange={e => inputOnchange(priceRange, setPriceRange, Number(e.currentTarget.value), false)}/>
            </div>
          </div>
          <div className={"filterType"}>
            <span>Rating</span>
            <div className={"sliderContainer"}>
              <input
                className={"rangeInput"}
                type={"number"}
                value={ratingRange[0].toString()}
                min={1}
                max={5}
                onChange={e => inputOnchange(ratingRange, setRatingRange, Number(e.currentTarget.value), true)}/>
              <Slider
                range
                min={1}
                max={5}
                value={ratingRange}
                onChange={(numbers) => {
                  if (Array.isArray(numbers)) {
                    setRatingRange(numbers);
                  }
                }}
                handleStyle={blackStyle}
                railStyle={brandStyle}
                trackStyle={brandStyle}
              />
              <input
                className={"rangeInput"}
                type={"number"}
                value={ratingRange[1].toString()}
                min={1}
                max={5}
                onChange={e => inputOnchange(ratingRange, setRatingRange, Number(e.currentTarget.value), false)}/>
            </div>
          </div>
          <div className={"filterType"}>
            <span>Sort by</span>
            <ul>
              {sortFilter.map(option => {
                return <li key={option.name}>
                  <input checked={option.isChecked} autoComplete={"off"} type={"checkbox"}/>
                  <span>{option.name}</span>
                </li>
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}