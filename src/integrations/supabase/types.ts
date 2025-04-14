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
      accommodation_availability: {
        Row: {
          accommodation_id: string
          created_at: string
          end_date: string
          id: string
          is_available: boolean
          start_date: string
          updated_at: string
        }
        Insert: {
          accommodation_id: string
          created_at?: string
          end_date: string
          id?: string
          is_available?: boolean
          start_date: string
          updated_at?: string
        }
        Update: {
          accommodation_id?: string
          created_at?: string
          end_date?: string
          id?: string
          is_available?: boolean
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_availability_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodation_images: {
        Row: {
          accommodation_id: string
          created_at: string
          id: string
          is_primary: boolean | null
          url: string
        }
        Insert: {
          accommodation_id: string
          created_at?: string
          id?: string
          is_primary?: boolean | null
          url: string
        }
        Update: {
          accommodation_id?: string
          created_at?: string
          id?: string
          is_primary?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_images_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodations: {
        Row: {
          address: string | null
          amenities: string[] | null
          bathroom_shared_count: number | null
          bathroom_type: Database["public"]["Enums"]["bathroom_type"]
          checkin_day: Database["public"]["Enums"]["checkin_day"]
          city: string
          created_at: string
          description: string | null
          gender: Database["public"]["Enums"]["room_gender"]
          google_maps_link: string | null
          id: string
          is_active: boolean
          min_weeks: number
          neighborhood: string | null
          price_per_week: number
          provider: string
          room_type: Database["public"]["Enums"]["room_type"]
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          bathroom_shared_count?: number | null
          bathroom_type: Database["public"]["Enums"]["bathroom_type"]
          checkin_day?: Database["public"]["Enums"]["checkin_day"]
          city: string
          created_at?: string
          description?: string | null
          gender: Database["public"]["Enums"]["room_gender"]
          google_maps_link?: string | null
          id?: string
          is_active?: boolean
          min_weeks?: number
          neighborhood?: string | null
          price_per_week: number
          provider: string
          room_type: Database["public"]["Enums"]["room_type"]
          title: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          bathroom_shared_count?: number | null
          bathroom_type?: Database["public"]["Enums"]["bathroom_type"]
          checkin_day?: Database["public"]["Enums"]["checkin_day"]
          city?: string
          created_at?: string
          description?: string | null
          gender?: Database["public"]["Enums"]["room_gender"]
          google_maps_link?: string | null
          id?: string
          is_active?: boolean
          min_weeks?: number
          neighborhood?: string | null
          price_per_week?: number
          provider?: string
          room_type?: Database["public"]["Enums"]["room_type"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          document_type: string
          feedback: string | null
          file_name: string
          file_url: string
          id: string
          reservation_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["document_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          feedback?: string | null
          file_name: string
          file_url: string
          id?: string
          reservation_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          feedback?: string | null
          file_name?: string
          file_url?: string
          id?: string
          reservation_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_broadcast: boolean | null
          is_read: boolean | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_broadcast?: boolean | null
          is_read?: boolean | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_broadcast?: boolean | null
          is_read?: boolean | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          commission: number | null
          created_at: string
          id: string
          notes: string | null
          payment_date: string | null
          payment_proof_url: string | null
          payment_type: string
          provider_fee: number | null
          provider_payment_date: string | null
          provider_payment_status:
            | Database["public"]["Enums"]["payment_status"]
            | null
          reservation_id: string
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          commission?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_proof_url?: string | null
          payment_type: string
          provider_fee?: number | null
          provider_payment_date?: string | null
          provider_payment_status?:
            | Database["public"]["Enums"]["payment_status"]
            | null
          reservation_id: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          commission?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_proof_url?: string | null
          payment_type?: string
          provider_fee?: number | null
          provider_payment_date?: string | null
          provider_payment_status?:
            | Database["public"]["Enums"]["payment_status"]
            | null
          reservation_id?: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          form_submitted: boolean | null
          id: string
          last_name: string | null
          nationality: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          form_submitted?: boolean | null
          id: string
          last_name?: string | null
          nationality?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          form_submitted?: boolean | null
          id?: string
          last_name?: string | null
          nationality?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      reservation_steps: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          reservation_id: string
          status: Database["public"]["Enums"]["checklist_status"]
          step_name: string
          step_order: number
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          reservation_id: string
          status?: Database["public"]["Enums"]["checklist_status"]
          step_name: string
          step_order: number
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          reservation_id?: string
          status?: Database["public"]["Enums"]["checklist_status"]
          step_name?: string
          step_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_steps_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          accommodation_id: string
          check_in: string
          check_out: string
          created_at: string
          emergency_contact_email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relation: string | null
          extra_night_dates: string | null
          extra_night_quantity: number | null
          extra_night_required: boolean | null
          extra_night_type: string | null
          food_restriction: boolean | null
          food_restriction_details: string | null
          form_submitted: boolean | null
          health_restriction: boolean | null
          health_restriction_details: string | null
          id: string
          internal_notes: string | null
          status: Database["public"]["Enums"]["reservation_status"]
          total_price: number
          updated_at: string
          user_id: string
          weeks: number
        }
        Insert: {
          accommodation_id: string
          check_in: string
          check_out: string
          created_at?: string
          emergency_contact_email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          extra_night_dates?: string | null
          extra_night_quantity?: number | null
          extra_night_required?: boolean | null
          extra_night_type?: string | null
          food_restriction?: boolean | null
          food_restriction_details?: string | null
          form_submitted?: boolean | null
          health_restriction?: boolean | null
          health_restriction_details?: string | null
          id?: string
          internal_notes?: string | null
          status?: Database["public"]["Enums"]["reservation_status"]
          total_price: number
          updated_at?: string
          user_id: string
          weeks: number
        }
        Update: {
          accommodation_id?: string
          check_in?: string
          check_out?: string
          created_at?: string
          emergency_contact_email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          extra_night_dates?: string | null
          extra_night_quantity?: number | null
          extra_night_required?: boolean | null
          extra_night_type?: string | null
          food_restriction?: boolean | null
          food_restriction_details?: string | null
          form_submitted?: boolean | null
          health_restriction?: boolean | null
          health_restriction_details?: string | null
          id?: string
          internal_notes?: string | null
          status?: Database["public"]["Enums"]["reservation_status"]
          total_price?: number
          updated_at?: string
          user_id?: string
          weeks?: number
        }
        Relationships: [
          {
            foreignKeyName: "reservations_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin_or_staff: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      bathroom_type: "privativo" | "compartilhado"
      checkin_day: "sabado" | "domingo" | "qualquer"
      checklist_status: "pendente" | "em_andamento" | "concluido"
      document_status: "aguardando" | "aprovado" | "recusado"
      payment_status: "pendente" | "pago" | "reembolsado"
      reservation_status:
        | "pendente"
        | "processando"
        | "confirmada"
        | "cancelada"
      room_gender: "masculino" | "feminino" | "misto"
      room_type: "individual" | "duplo" | "triplo" | "quadruplo"
      user_role:
        | "admin"
        | "suporte"
        | "verificacao"
        | "financeiro"
        | "vendas"
        | "cliente"
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
    Enums: {
      bathroom_type: ["privativo", "compartilhado"],
      checkin_day: ["sabado", "domingo", "qualquer"],
      checklist_status: ["pendente", "em_andamento", "concluido"],
      document_status: ["aguardando", "aprovado", "recusado"],
      payment_status: ["pendente", "pago", "reembolsado"],
      reservation_status: [
        "pendente",
        "processando",
        "confirmada",
        "cancelada",
      ],
      room_gender: ["masculino", "feminino", "misto"],
      room_type: ["individual", "duplo", "triplo", "quadruplo"],
      user_role: [
        "admin",
        "suporte",
        "verificacao",
        "financeiro",
        "vendas",
        "cliente",
      ],
    },
  },
} as const
