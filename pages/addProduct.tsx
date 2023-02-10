import {Database} from "../utils/database.types";
import useProfile from "../hooks/useProfile";
import {useRouter} from 'next/router'
import {useState} from "react";

export default function Keywords() {

  const router = useRouter();
  const {profile, setProfile} = useProfile();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const addProduct = async () => {
    const res = await fetch(`/api/products`,
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          price: Number(price),
          type: type,
        })
      });
    const data = await res.json();
    if (data.id)
      router.push({pathname: `/products/${data.id}`});
  }

  if (profile && !profile.isAdmin) {
    router.push("/");
  }


  return (
    <>
      {profile && <div className="container">
        <form onSubmit={e => {
          e.preventDefault();
          addProduct();
        }} className={"addKeyword"}>
          <div className={"keywordInputs"}>
            <div className={"inputContainer"}>
              <label>Name</label>
              <input type={"text"} placeholder={"Name"} onChange={e => setName(e.currentTarget.value)}/>
            </div>
            <div className={"inputContainer"}>
              <label>Type</label>
              <input type={"text"} placeholder={"Type"} onChange={e => setType(e.currentTarget.value)}/>
            </div>
            <div className={"inputContainer"}>
              <label>Price</label>
              <input type={"text"} placeholder={"Price"} onChange={e => setPrice(e.currentTarget.value)}/>
            </div>
          </div>
          <div className={"addKeywordBtn"}>
            <button type={"submit"} className={"button"}>Add Product</button>
          </div>
        </form>
      </div>}
    </>
  )
}