import {Database, ProductTypes, SortOptions, TCheckbox} from "../utils/database.types";
import {useEffect, useState} from "react";
import Product from "../components/Product";
import {AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/router";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type TProductCard = Database['public']['Tables']['products']['Card'];

export default function Search() {

  const MIN_PRICE = 1;
  const MAX_PRICE = 1000;

  const router = useRouter();
  const [products, setProducts] = useState<TProductCard[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TCheckbox[]>(ProductTypes);
  const [sortFilter, setSortFilter] = useState<TCheckbox[]>(SortOptions);

  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [ratingRange, setRatingRange] = useState([1, 5]);

  function getQueryParams() {
    let query: string = router.query.query as string;
    let price: string = router.query.price as string;
    let rating: string = router.query.rating as string;
    let sort: string = router.query.sort as string;
    let type: string = router.query.type as string;

    if (query) {
      setSearchQuery(query);
    }
    if (price) {
      setPriceRange(price.split('-').map(num => Number(num)))
    }
    if (rating) {
      setRatingRange(rating.split('-').map(num => Number(num)))
    }
    if (sort) {
      const sortQueryList = sort.split(",");
      sortFilter.map(item => {
        item.isChecked = sortQueryList.includes(item.name);
      })
    }
    if (type) {
      const typeQueryList = type.split(",");
      typeFilter.map(item => {
        item.isChecked = typeQueryList.includes(item.name);
      })
    }
  }

  async function getSearchResults() {
    try {
      const res = await fetch(`/api${router.asPath}`);
      const json = await res.json();
      setProducts(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (router.asPath !== "/[search]") getSearchResults();
    getQueryParams();
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

  function checkboxOnchange(filterList: TCheckbox[], setFilterList: (list: TCheckbox[]) => void, index: number) {
    let _list = [...filterList];
    _list[index].isChecked = !_list[index].isChecked;
    setFilterList(_list);
  }

  function submitSearch() {
    const sortList = sortFilter.filter(item => item.isChecked).map(item => item.name);
    const typeList = typeFilter.filter(item => item.isChecked).map(item => item.name);

    if (searchQuery.length === 0) {
      delete router.query.query;
    } else {
      router.query.query = searchQuery;
    }

    if (priceRange[0] === MIN_PRICE && priceRange[1] === MAX_PRICE) {
      delete router.query.price;
    } else {
      router.query.price = `${priceRange[0]}-${priceRange[1]}`;
    }
    if (ratingRange[0] === 1 && ratingRange[1] === 5) {
      delete router.query.rating;
    } else {
      router.query.rating = `${ratingRange[0]}-${ratingRange[1]}`;
    }

    if (sortList.length === 0) {
      delete router.query.sort;
    } else {
      router.query.sort = sortList.join(",");
    }

    if (typeList.length === 0) {
      delete router.query.type;
    } else {
      router.query.type = typeList.join(",");
    }
    router.push(router);
  }

  return (
    <div className={"container"}>
      <div className={"searchProducts"}>
        <label>Search for products</label>
        <form onSubmit={(e) => {
          e.preventDefault();
          submitSearch();
        }} className={"searchInputContainer"}>
          <input type={"search"} placeholder={"Search for products"}
                 onChange={e => setSearchQuery(e.currentTarget.value)}/>
          <button type={"submit"} className={"searchButton"}><AiOutlineSearch/></button>
        </form>
      </div>
      <div className={"searchContainer searchWrap"}>
        <div className={"productsContainer"}>
          {products?.length ? products.map((item: TProductCard) => {
            return <Product product={item} key={item.id}/>
          }) : <div>{products !== null && "No results"}</div>}
        </div>
        <aside>
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
              {sortFilter.map((option, index) => {
                return <li key={option.name}>
                  <input
                    onChange={() => checkboxOnchange(sortFilter, setSortFilter, index)}
                    checked={option.isChecked}
                    autoComplete={"off"}
                    type={"checkbox"}
                  />
                  <span>{option.name}</span>
                </li>
              })}
            </ul>
          </div>
          <div className={"filterType"}>
            <span>Type</span>
            <ul>
              {typeFilter.map((type, index) => {
                return <li key={type.name}>
                  <input
                    onChange={() => checkboxOnchange(typeFilter, setTypeFilter, index)}
                    checked={type.isChecked}
                    autoComplete={"off"}
                    type={"checkbox"}
                  />
                  <span>{type.name}</span>
                </li>
              })}
            </ul>
          </div>
          <div className={"filterSubmit"}>
            <button onClick={submitSearch} className={"button"}>SUBMIT</button>
          </div>
        </aside>
      </div>
    </div>
  )
}