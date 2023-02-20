// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";
import {Database} from "../../../utils/database.types";

type TKeyword = Database["public"]["Tables"]["keywords"]["Row"]

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

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    try {
      // adds comment to the database
      console.log(body);
      if (body.text) {
        const keyWords = await getKeywords();
        body.recommendation_rating = sentimentAnalysis(body.text, keyWords);
        const {data, error, status} = await supabase
          .from('comments')
          .insert(body)
          .select(`id, created_at, text, rating`)
          .single();

        res.status(200).json(data);
      }
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
}
