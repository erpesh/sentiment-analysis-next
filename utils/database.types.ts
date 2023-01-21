export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

interface Comment {
  id: number,
  created_at: string,
  text: string,
  rating: number
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      },
      products: {
        Row: {
          id: number,
          created_at: string,
          name: string,
          comments: Comment[],
          rating: number
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
          product_id: number
          rating: number
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
          value: number
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
