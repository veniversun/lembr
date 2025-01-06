export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      acessos: {
        Row: {
          id: number
          numero_acessos: number | null
          numero_registros: number | null
        }
        Insert: {
          id?: number
          numero_acessos?: number | null
          numero_registros?: number | null
        }
        Update: {
          id?: number
          numero_acessos?: number | null
          numero_registros?: number | null
        }
        Relationships: []
      }
      daily_usage: {
        Row: {
          created_at: string
          id: number
          usage_date: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          usage_date?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          usage_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      essen: {
        Row: {
          a: string | null
          q: string | null
        }
        Insert: {
          a?: string | null
          q?: string | null
        }
        Update: {
          a?: string | null
          q?: string | null
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          answer: string
          created_at: string
          id: number
          question: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: number
          question: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: number
          question?: string
        }
        Relationships: []
      }
      generalista: {
        Row: {
          a: string
          created_at: string
          id: number
          q: string
        }
        Insert: {
          a: string
          created_at?: string
          id?: number
          q: string
        }
        Update: {
          a?: string
          created_at?: string
          id?: number
          q?: string
        }
        Relationships: []
      }
      habatom: {
        Row: {
          a: string | null
          q: string | null
        }
        Insert: {
          a?: string | null
          q?: string | null
        }
        Update: {
          a?: string | null
          q?: string | null
        }
        Relationships: []
      }
      hatm: {
        Row: {
          A: string | null
          Q: string | null
        }
        Insert: {
          A?: string | null
          Q?: string | null
        }
        Update: {
          A?: string | null
          Q?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string
          email: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          occupation: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          occupation?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          occupation?: string | null
        }
        Relationships: []
      }
      psifin: {
        Row: {
          a: string | null
          q: string | null
        }
        Insert: {
          a?: string | null
          q?: string | null
        }
        Update: {
          a?: string | null
          q?: string | null
        }
        Relationships: []
      }
      registros: {
        Row: {
          cidade: string
          created_at: string
          email: string
          id: number
          idade: number
          leu_livro: boolean
          nome: string
          ocupacao: string
          sexo: string
        }
        Insert: {
          cidade: string
          created_at?: string
          email: string
          id?: number
          idade: number
          leu_livro: boolean
          nome: string
          ocupacao: string
          sexo: string
        }
        Update: {
          cidade?: string
          created_at?: string
          email?: string
          id?: number
          idade?: number
          leu_livro?: boolean
          nome?: string
          ocupacao?: string
          sexo?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          book_type: string
          correct_count: number | null
          created_at: string
          id: number
          incorrect_count: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          book_type: string
          correct_count?: number | null
          created_at?: string
          id?: number
          incorrect_count?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          book_type?: string
          correct_count?: number | null
          created_at?: string
          id?: number
          incorrect_count?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: number
          name: string
          nickname: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          nickname: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          nickname?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
