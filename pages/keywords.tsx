import {Database} from "../utils/database.types";
import {useEffect, useState} from "react";

type TKeyword = Database['public']['Tables']['keywords']['Row'];
export default function Keywords() {

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

  async function deleteKeyword(keywordId: number){
    console.log(keywordId);
    const res = await fetch(`/api/keywords/${keywordId}`,
      {
        method: "DELETE",
      });
    fetchData()
  }

  if (!keywords) {
    return <p>Loading...</p>
  }

  return (
    <div className="container" style={{padding: '50px 0 100px 0'}}>
      <div className={"addKeyword"}>
        <div className={"keywordInputs"}>
          <input type={"text"} placeholder={"Keyword"} onChange={(e) => setKeyword(e.target.value)}/>
          <input type={"text"} placeholder={"Weight"} onChange={(e) => setWeight(e.target.value)}/>
        </div>
        <div className={"addKeywordBtn"}>
          <button onClick={addKeyword}>Add Keyword</button>
        </div>
      </div>
      <div className={"keywordsList"}>
        {keywords && keywords.map(keywordsItem => {
          return <div className={"keywordItem"} key={keywordsItem.id}>
            <div className={"keywordValue"}>
              <div className={"keywordValuesItem"}>
                <span className={"keywordLabel"}>Keyword</span>
                <span className={"keywordData"}>{keywordsItem.keyword}</span>
              </div>
              <div className={"keywordValuesItem"}>
                <span className={"keywordLabel"}>Weight</span>
                <span className={"keywordData"}>{keywordsItem.weight}</span>
              </div>
            </div>
            <div className={"keywordButtons"}>
              <button onClick={() => deleteKeyword(keywordsItem.id)}>Delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}