// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST"){
    const body = JSON.parse(req.body);
    const {data, error, status} = await supabase
      .from('keywords')
      .insert(body)
      .select(`*`)
      .single();
    res.status(200).json(data);
  }
  else if (req.method === "GET"){
    const {data, error, status} = await supabase
      .from('keywords')
      .select(`*`)
    res.status(200).json(data);
  }
}