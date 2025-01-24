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
          nivel: number | null
          q: string | null
        }
        Insert: {
          a?: string | null
          nivel?: number | null
          q?: string | null
        }
        Update: {
          a?: string | null
          nivel?: number | null
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
