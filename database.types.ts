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
      applications: {
        Row: {
          created_at: string
          description: string
          FK_grantID: number
          FK_orgApply: number
          FK_orgGrant: number
          id: number
          purpose: string
          status: string | null
          timeline: string
        }
        Insert: {
          created_at?: string
          description?: string
          FK_grantID: number
          FK_orgApply: number
          FK_orgGrant: number
          id?: number
          purpose?: string
          status?: string | null
          timeline?: string
        }
        Update: {
          created_at?: string
          description?: string
          FK_grantID?: number
          FK_orgApply?: number
          FK_orgGrant?: number
          id?: number
          purpose?: string
          status?: string | null
          timeline?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_applications_FK_grantID_fkey"
            columns: ["FK_grantID"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_applications_FK_orgApply_fkey"
            columns: ["FK_orgApply"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_applications_FK_orgGrant_fkey"
            columns: ["FK_orgGrant"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      grants: {
        Row: {
          acceptedDate: string | null
          amount: number
          created_at: string
          deadline: string | null
          description: string
          FK_organizations: number
          FK_orgFunded: number | null
          id: number
          inReview: boolean | null
          isOpen: boolean
          name: string
          requirements: string | null
        }
        Insert: {
          acceptedDate?: string | null
          amount?: number
          created_at?: string
          deadline?: string | null
          description?: string
          FK_organizations: number
          FK_orgFunded?: number | null
          id?: number
          inReview?: boolean | null
          isOpen?: boolean
          name?: string
          requirements?: string | null
        }
        Update: {
          acceptedDate?: string | null
          amount?: number
          created_at?: string
          deadline?: string | null
          description?: string
          FK_organizations?: number
          FK_orgFunded?: number | null
          id?: number
          inReview?: boolean | null
          isOpen?: boolean
          name?: string
          requirements?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_grants_FK_organizations_fkey"
            columns: ["FK_organizations"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_grants_FK_orgFunded_fkey"
            columns: ["FK_orgFunded"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          FK_organizations: number
          FK_profiles: string
          id: number
        }
        Insert: {
          FK_organizations: number
          FK_profiles?: string
          id?: number
        }
        Update: {
          FK_organizations?: number
          FK_profiles?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_invites_FK_organizations_fkey"
            columns: ["FK_organizations"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_invites_FK_profiles_fkey"
            columns: ["FK_profiles"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          admins: string[]
          bio: string | null
          email: string | null
          id: number
          isNonProfit: boolean
          name: string | null
          owner: string
          website: string | null
        }
        Insert: {
          admins?: string[]
          bio?: string | null
          email?: string | null
          id?: number
          isNonProfit?: boolean
          name?: string | null
          owner: string
          website?: string | null
        }
        Update: {
          admins?: string[]
          bio?: string | null
          email?: string | null
          id?: number
          isNonProfit?: boolean
          name?: string | null
          owner?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          email: string | null
          FK_organizations: number | null
          full_name: string | null
          id: string
        }
        Insert: {
          bio?: string | null
          email?: string | null
          FK_organizations?: number | null
          full_name?: string | null
          id: string
        }
        Update: {
          bio?: string | null
          email?: string | null
          FK_organizations?: number | null
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_profiles_FK_organizations_fkey"
            columns: ["FK_organizations"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
