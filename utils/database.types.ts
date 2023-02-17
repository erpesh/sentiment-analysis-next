export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface TCheckbox {
  name: string,
  isChecked: boolean
}

export const ProductTypes = [
  {name: "book", isChecked: false},
  {name: "laptop", isChecked: false},
  {name: "tool", isChecked: false}
];
export const SortOptions = [
  {name: "rating", isChecked: false},
  {name: "recommendation", isChecked: false},
  {name: "price ascending", isChecked: false},
  {name: "price descending", isChecked: false},
  {name: "popularity", isChecked: false}
];

export interface RangeQueryDetails {
  type: "Price" | "Rating",
  start: number,
  end: number
}
export interface CheckboxQueryDetails {
  type: "Type" | "Sort",
  name: string,
  value: boolean
}

export interface Comment {
  id: number,
  created_at: string,
  text: string,
  rating: number,
  recommendation_rating: number,
  author: Database["public"]["Tables"]["users"]["Row"]
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          isAdmin: boolean
          first_name: string | null
          last_name: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          isAdmin?: boolean | null
          first_name: string | null
          last_name: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          isAdmin?: boolean | null
          first_name: string | null
          last_name: string | null
        }
      },
      products: {
        Row: {
          id: number,
          created_at: string,
          name: string,
          price: number,
          type: string,
          image_url: string | null,
          comments: Comment[],
        }
        Card: {
          id: number,
          created_at: string,
          name: string,
          price: number,
          type: string,
          image_url: string | null,
          rating: number | null,
          recommendation_rating: number | null,
          num_comments: number
        }
        // Insert: {
        //   id: number,
        //   created_at?: string | null
        //   name?: string | null
        // }
        // Update: {
        //   id?: number
        //   created_at?: string | null
        //   name?: string | null
        // }
      },
      comments: {
        Row: {
          id: number,
          created_at: string,
          text: string,
          product_id: number,
          rating: number,
          recommendation_rating: number,
        }
        // Insert: {
        //   id?: number | null,
        //   created_at?: string | null
        //   text: string
        //   product_id: number
        //   rating: number
        // }
        // Update: {
        //   id?: number
        //   created_at?: string | null
        //   text?: string | null
        //   product_id?: number | null
        //   rating?: number | null
        // }
      }
      keywords: {
        Row: {
          id: number,
          keyword: string,
          weight: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
