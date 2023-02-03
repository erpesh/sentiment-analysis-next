// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";
import {Database} from "../../../utils/database.types";

type TKeyword = Database["public"]["Tables"]["keywords"]["Row"]
type TProduct = Database["public"]["Tables"]["products"]["Row"]

function sentimentAnalysis(comment: string, keywords: TKeyword[]) {
  let commentCopy = `${comment}`.toLowerCase();
  let score = 0;
  let totalKeywordsFound = 0;

  // Iterate through the keywords
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i].keyword;
    let value = keywords[i].weight;

    // Check if the keyword is present in the comment
    if (commentCopy.indexOf(keyword) !== -1) {
      // If so, add the value to the score
      score += value;
      totalKeywordsFound++;
    }
  }
  return score === 0 ? 0 : score / totalKeywordsFound;
}

// fetches all keywords from the database
const getKeywords = async () => {
  const response = await supabase
    .from('keywords')
    .select(`*`)
  return response.data as TKeyword[];
}

const updateProductRating = async (product_id: number, rating: number) => {
  const response = await supabase
    .from("products")
    .update({rating: rating})
    .eq("id", 2)
    .select("id, created_at, name, comments(id, created_at, text, rating)")
    .single();
  console.log(response);
  return response.data as TProduct;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    try {
      // adds comment to the database
      const {data, error, status} = await supabase
        .from('comments')
        .insert(body)
        .select(`id, created_at, text, rating`)
        .single();

      // const keywords = await getKeywords();

      // calculate sentiment rating
      // const sentimentRating = sentimentAnalysis(data.text, keywords);
      // const product = await updateProductRating(body.product_id, sentimentRating);

      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
}
