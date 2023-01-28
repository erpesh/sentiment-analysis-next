// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const commentId = req.query.commentId;

  if (req.method === "DELETE"){
    const {data, error, status} = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
    res.status(200).json(status);
  }
}
