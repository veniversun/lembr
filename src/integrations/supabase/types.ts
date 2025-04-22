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
      dale: {
        Row: {
          a: string
          id: number
          n: number | null
          q: string
        }
        Insert: {
          a: string
          id?: number
          n?: number | null
          q: string
        }
        Update: {
          a?: string
          id?: number
          n?: number | null
          q?: string
        }
        Relationships: []
      }
      essen: {
        Row: {
          a: string | null
          id: number
          n: number | null
          q: string | null
        }
        Insert: {
          a?: string | null
          id?: number
          n?: number | null
          q?: string | null
        }
        Update: {
          a?: string | null
          id?: number
          n?: number | null
          q?: string | null
        }
        Relationships: []
      }
      generalista: {
        Row: {
          a: string
          created_at: string
          id: number
          n: number | null
          q: string
        }
        Insert: {
          a: string
          created_at?: string
          id?: number
          n?: number | null
          q: string
        }
        Update: {
          a?: string
          created_at?: string
          id?: number
          n?: number | null
          q?: string
        }
        Relationships: []
      }
      habatom: {
        Row: {
          a: string | null
          id: number
          n: number | null
          q: string | null
        }
        Insert: {
          a?: string | null
          id: number
          n?: number | null
          q?: string | null
        }
        Update: {
          a?: string | null
          id?: number
          n?: number | null
          q?: string | null
        }
        Relationships: []
      }
      interessados: {
        Row: {
          cidade: string
          created_at: string
          email: string
          estado: string
          id: number
          idade: string
          nome: string
          ocupacao: string
          sexo: string
        }
        Insert: {
          cidade: string
          created_at?: string
          email: string
          estado: string
          id?: number
          idade: string
          nome: string
          ocupacao: string
          sexo: string
        }
        Update: {
          cidade?: string
          created_at?: string
          email?: string
          estado?: string
          id?: number
          idade?: string
          nome?: string
          ocupacao?: string
          sexo?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: string | null
          city: string | null
          created_at: string
          email: string | null
          full_name: string | null
          gender: string | null
          id: string
          is_plus: boolean | null
          occupation: string | null
          updated_at: string
        }
        Insert: {
          age?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          is_plus?: boolean | null
          occupation?: string | null
          updated_at?: string
        }
        Update: {
          age?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          is_plus?: boolean | null
          occupation?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      psifin: {
        Row: {
          a: string | null
          id: number
          n: number | null
          q: string | null
        }
        Insert: {
          a?: string | null
          id?: number
          n?: number | null
          q?: string | null
        }
        Update: {
          a?: string | null
          id?: number
          n?: number | null
          q?: string | null
        }
        Relationships: []
      }
      resumos: {
        Row: {
          banco_de_dados: string
          created_at: string
          id: number
          ideias: string | null
          resumo: string
          titulo: string
        }
        Insert: {
          banco_de_dados: string
          created_at?: string
          id?: number
          ideias?: string | null
          resumo: string
          titulo: string
        }
        Update: {
          banco_de_dados?: string
          created_at?: string
          id?: number
          ideias?: string | null
          resumo?: string
          titulo?: string
        }
        Relationships: []
      }
      user_access_days: {
        Row: {
          access_date: string
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          access_date?: string
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          access_date?: string
          created_at?: string
          id?: number
          user_id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
