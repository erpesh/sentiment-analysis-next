// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const keywordId = req.query.keywordId;

  if (req.method === "DELETE"){
    const {data, error, status} = await supabase
      .from('keywords')
      .delete()
      .eq('id', keywordId)
    res.status(200).json(status);
  }
}