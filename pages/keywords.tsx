import {Database} from "../utils/database.types";
import {useEffect, useState} from "react";

type TKeyword = Database['public']['Tables']['keywords']['Row'];
export default function Keywords() {

  const [keywords, setKeywords] = useState<TKeyword[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/keywords`);
        const json = await res.json();
        console.log(await json);
        setKeywords(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  if (!keywords) {
    return <p>Loading...</p>
  }

  return (
    <>
      {keywords.map((item: TKeyword) => {
        return <div key={item.id}>{item.keyword}</div>
      })}
    </>
  )
}