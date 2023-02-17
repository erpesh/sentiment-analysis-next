// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../utils/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let query = <string>req.query.query;
  let price = <string>req.query.price;
  let rating = <string>req.query.rating;
  let sort = <string>req.query.sort;
  let type = <string>req.query.type;

  const supabaseQuery = supabase
    .from('product_comments_count')
    .select(`*`)

  if (query) {
    supabaseQuery.textSearch("name", query);
  }

  if (price){
    const priceGte = price.split("-")[0];
    const priceLte = price.split("-")[1];
    supabaseQuery
      .filter('price', "gte", priceGte)
      .filter('price', "lte", priceLte)
  }

  if (rating) {
    const ratingGte = rating.split("-")[0];
    const ratingLte = rating.split("-")[1];
    supabaseQuery
      .filter('rating', 'gte', ratingGte)
      .filter('rating', 'lte', ratingLte)
  }

  if (sort) {
    sort.split(",").forEach(item => {
      if (item === "rating")
        supabaseQuery.order("rating", {ascending: false, nullsFirst: false})
      else if (item === "recommendation")
        supabaseQuery.order("recommendation_rating", {ascending: false, nullsFirst: false})
      else if (item === "price ascending")
        supabaseQuery.order("price", {ascending: true})
      else if (item === "price descending")
        supabaseQuery.order("price", {ascending: false, nullsFirst: false})
      else if (item === "popularity")
        supabaseQuery.order("num_comments", {ascending: false, nullsFirst: false})
    })
  }

  if (type) {
    type.split(",").forEach(item => {
      console.log(item);
      supabaseQuery.eq("type", item)
    })
  }

  const { data, error } = await supabaseQuery;
  res.status(200).json(data);
}
