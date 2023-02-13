import {Database} from "../utils/database.types";
import useProfile from "../hooks/useProfile";
import {useRouter} from 'next/router'
import React, {useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

type TProduct = Database['public']['Tables']['products']['Row']

export default function Keywords() {

  const supabase = useSupabaseClient<Database>()
  const [imageUrl, setImageUrl] = useState<TProduct['image_url']>(null)
  const [uploading, setUploading] = useState(false)

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
          image_url: imageUrl
        })
      });
    const data = await res.json();
    if (data.id)
      router.push({pathname: `/products/${data.id}`});
  }

  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}-${name}.${fileExt}`
      const filePath = `${fileName}`

      let {error: uploadError} = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {upsert: true})

      if (uploadError) {
        throw uploadError
      }

      setImageUrl(filePath);
      console.log(filePath)

    } catch (error) {
      alert('Error uploading image!')
      console.log(error)
    } finally {
      setUploading(false)
    }
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
          <div className={"fileInputContainer"}>
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadImage}
              disabled={uploading}
            />
          </div>
          <div className={"addKeywordBtn"}>
            <button type={"submit"} className={"button"}>Add Product</button>
          </div>
        </form>
      </div>}
    </>
  )
}