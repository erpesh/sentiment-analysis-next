import {useUser} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Database} from "../utils/database.types";

type TProduct = Database['public']['Tables']['products']['Row'];


const useProductOperations = () => {
  const user = useUser();
  const router = useRouter();
  const {productId} = router.query;

  const [product, setProduct] = useState<TProduct | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  async function fetchData() {
    try {
      const res = await fetch(`/api/products/${productId}`);
      const [json] = await res.json();
      setProduct(json);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(){
    if (!user) throw new Error("no user");
    const res = await fetch(`/api/products/${productId}`,
      {
        method: "DELETE",
      });
    router.push({pathname: "/search"});
  }

  async function deleteComment(commentId: number){
    if (!user) throw new Error("no user");
    const res = await fetch(`/api/comments/${commentId}`,
      {
        method: "DELETE",
      });
    fetchData()
  }

  async function addComment() {
    if (!user) throw new Error("no user");

    const newComment = {
      text: comment,
      product_id: Number(productId),
      rating: rating,
      user_id: user.id
    }

    const res = await fetch(`/api/comments`,
      {
        method: "POST",
        body: JSON.stringify(newComment)
      });
    // const json = await res.json();

    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [productId])

  return {
    product,
    deleteComment,
    rating,
    setRating,
    setComment,
    addComment,
    deleteProduct,
    userId: user?.id
  }
}

export default useProductOperations;