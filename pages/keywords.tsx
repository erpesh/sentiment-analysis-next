import {Database} from "../utils/database.types";
import {useEffect, useState} from "react";
import useProfile from "../hooks/useProfile";
import {useRouter} from 'next/router'
import {AiFillDelete, AiOutlineSearch} from 'react-icons/ai';

type TKeyword = Database['public']['Tables']['keywords']['Row'];
export default function Keywords() {

  const router = useRouter();
  const {profile, setProfile} = useProfile();
  const [searchQuery, setSearchQuery] = useState("");
  const [keywords, setKeywords] = useState<TKeyword[]>([]);
  const [keyword, setKeyword] = useState("");
  const [weight, setWeight] = useState("");

  async function fetchData() {
    try {
      const res = await fetch(`/api/keywords`);
      const json = await res.json();
      setKeywords(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addKeyword = async () => {
    if (keyword && weight && Number(weight)) {
      const res = await fetch(`/api/keywords`,
        {
          method: "POST",
          body: JSON.stringify({
            keyword: keyword,
            weight: Number(weight),
          })
        });
      fetchData();
    }
  }

  async function deleteKeyword(keywordId: number) {
    console.log(keywordId);
    const res = await fetch(`/api/keywords/${keywordId}`,
      {
        method: "DELETE",
      });
    fetchData()
  }

  if (profile && !profile.isAdmin) {
    router.push("/");
  }

  return (
    <>
      {profile && <div className="container keywordsContainer">
        <div className={"searchKeywords"}>
          <label>Search for keywords</label>
          <div className={"searchInputContainer"}>
            <input type={"search"} placeholder={"Search for keywords"} onChange={e => setSearchQuery(e.currentTarget.value)}/>
            <button className={"searchButton"}><AiOutlineSearch/></button>
          </div>
        </div>
        <div className={"addKeyword"}>
          <div className={"keywordInputs"}>
            <div className={"inputContainer"}>
              <label>Keyword</label>
              <input type={"text"} placeholder={"Keyword"} onChange={e => setKeyword(e.currentTarget.value)}/>
            </div>
            <div className={"inputContainer"}>
              <label>Weight</label>
              <input type={"text"} placeholder={"Weight"} onChange={e => setWeight(e.currentTarget.value)}/>
            </div>
          </div>
          <div className={"addKeywordBtn"}>
            <button className={"button"} onClick={addKeyword}>Add Keyword</button>
          </div>
        </div>
        <div className={"keywordsList"}>
          {keywords && keywords.filter(item => item.keyword.includes(searchQuery)).map(keywordsItem => {
            return <div className={"keywordItem"} key={keywordsItem.id}>
              <div className={"keywordValue"}>
                <div className={"keywordValuesItem"}>
                  <span className={"keywordLabel"}>Keyword</span>
                  <span className={"keywordData"}>{keywordsItem.keyword}</span>
                </div>
                <div className={"keywordValuesItem"}>
                  <span className={"keywordLabel"}>Weight</span>
                  <span className={"keywordWeight"}>{keywordsItem.weight}</span>
                </div>
              </div>
              <div className={"keywordButtons"}>
                <button className={"deleteKeyword"} onClick={() => deleteKeyword(keywordsItem.id)}><AiFillDelete/></button>
              </div>
            </div>
          })}
        </div>
      </div>}
    </>
  )
}