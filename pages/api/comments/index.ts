// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";
import {Database} from "../../../utils/database.types";

type TKeyword = Database["public"]["Tables"]["keywords"]["Row"]

function sentimentAnalysis(comment: string, keywords: TKeyword[]) {
  let commentCopy = `${comment}`.toLowerCase();
  let score = 0;

  let foundKeywords: TKeyword[] = [];

  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i].keyword;

    if (commentCopy.indexOf(keyword) !== -1) {
      foundKeywords.push(keywords[i]);
    }
  }

  for (let i = 0; i < foundKeywords.length; i++) {
    let keyword = foundKeywords[i].keyword;
    let value = foundKeywords[i].weight;

    if (commentCopy.indexOf("not " + keyword) !== -1 || commentCopy.indexOf("not the " + keyword) !== -1)
      score += value - 4;
    else score += value;
  }
  return score === 0 ? 0 : score / foundKeywords.length;
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
