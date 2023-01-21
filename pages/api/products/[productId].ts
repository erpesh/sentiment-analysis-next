// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";
import {Database} from "../../../utils/database.types";

type TKeyword = Database["public"]["Tables"]["keywords"]["Row"]

function sentimentAnalysis(comment: string, keywords: TKeyword[]) {
  let commentCopy = `${comment}`.toLowerCase();
  let score = 0;

  // Iterate through the keywords
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i].keyword;
    let value = keywords[i].value;

    // Check if the keyword is present in the comment
    if (commentCopy.indexOf(keyword) !== -1) {
      // If so, add the value to the score
      score += value;
    }
  }
  console.log(score);
  return score;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const productId = req.query.productId;

  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    try {
      const {data, error, status} = await supabase
        .from('comments')
        .insert(body)
        .select(`*`)
        .single();
      console.log(data);
      res.status(200).json(data);

      const response = await supabase
        .from('keywords')
        .select(`*`)

      const keywords = response.data as TKeyword[];

      sentimentAnalysis(data.text, keywords);

    } catch (e: any) {
      res.status(500).json(e.message);
    }
  } else {
    const {data, error, status} = await supabase
      .from('products')
      .select(`id, created_at, name, comments(id, created_at, text, rating)`)
      .eq('id', productId)
      .single()
    res.status(200).json(data);
  }
}
