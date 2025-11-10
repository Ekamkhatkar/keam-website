export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_admin?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          package_type: string
          price: number
          status: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled'
          design_brief: Json
          custom_quote_price: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          package_type: string
          price: number
          status?: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled'
          design_brief: Json
          custom_quote_price?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          package_type?: string
          price?: number
          status?: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled'
          design_brief?: Json
          custom_quote_price?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          order_id: string
          user_id: string
          content: string
          file_url: string | null
          file_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          user_id: string
          content: string
          file_url?: string | null
          file_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          user_id?: string
          content?: string
          file_url?: string | null
          file_type?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          order_id: string
          user_id: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          user_id: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          user_id?: string
          rating?: number
          comment?: string
          created_at?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          subject: string
          message: string
          status: 'open' | 'in_progress' | 'resolved'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          message: string
          status?: 'open' | 'in_progress' | 'resolved'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          message?: string
          status?: 'open' | 'in_progress' | 'resolved'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}