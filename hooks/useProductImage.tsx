import {useEffect, useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../utils/database.types";

function useProductImage(image_url: string | null | undefined){

  const supabase = useSupabaseClient<Database>()

  async function downloadImage(path: string) {
    try {
      const {data, error} = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (image_url) downloadImage(image_url)
  }, [image_url])

  return imageUrl;
}

export default useProductImage;