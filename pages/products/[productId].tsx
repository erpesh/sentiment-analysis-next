import {useRouter} from "next/router";
import {Database} from "../../utils/database.types";
import {useEffect, useState} from "react";

type TProduct = Database['public']['Tables']['products']['Row']
export default function Product() {

  // const supabase = useSupabaseClient<Database>()
  const router = useRouter();
  const {productId} = router.query;

  // const [loading, setLoading] = useState(true)
  // const user = useUser()

  const [product, setProduct] = useState<TProduct | null>(null);

  // const postData = async () => {
  //   const response = await fetch("/api/product", {
  //     method: "POST",
  //     body: JSON.stringify({id: 21, created_at: "124", name: "name"}),
  //   });
  //   return response.json();
  // }

  // const getProduct = async () => {
  //   try {
  //     setLoading(true)
  //     // if (!user) throw new Error('No user')
  //     console.log("/api/products/" + productId);
  //     const response = await fetch("/api/products/" + productId, {
  //       method: "POST",
  //       body: JSON.stringify({id: 21, created_at: "124", name: "name"}),
  //     });
  //     // const data = response.json();
  //     // if (error && status !== 406) {
  //     //   throw error
  //     // }
  //     return response;
  //
  //   }
  //   finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products/2')
        // console.log(await res.text())
        const json = await res.json()
        setProduct(json)
      }
      catch(error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.id}</p>
      <p>{product.created_at}</p>
    </div>
  )
}