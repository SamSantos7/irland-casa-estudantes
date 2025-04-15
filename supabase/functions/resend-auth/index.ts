
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Missing API key" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const { event, user } = await req.json();

    console.log("Received event:", event, "for user:", user.email);

    if (event === "user.created") {
      const resetLink = `${req.headers.get("origin") || "https://irland-casa-estudantes.lovable.app"}/client-area`;
      
      const { data, error } = await resend.emails.send({
        from: "Irland Casa <noreply@resend.dev>",
        to: user.email,
        subject: "Crie sua senha para acessar sua área de cliente",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2c3e50;">Bem-vindo à Irland Casa Estudantes!</h2>
            <p>Sua reserva foi recebida com sucesso. Para acessar sua área do cliente e acompanhar o status da sua reserva, por favor crie sua senha usando o link abaixo:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Criar minha senha</a>
            </div>
            <p>Se você não solicitou este e-mail, por favor ignore-o.</p>
            <p style="color: #7f8c8d; font-size: 12px; margin-top: 40px;">Este é um e-mail automático, por favor não responda.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Erro ao enviar e-mail:", error);
        return new Response(
          JSON.stringify({ error: "Erro ao enviar e-mail" }),
          { 
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }

      console.log("E-mail enviado com sucesso:", data);
      return new Response(
        JSON.stringify({ message: "E-mail enviado com sucesso" }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Evento ignorado" }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (err) {
    console.error("Erro inesperado:", err);
    return new Response(
      JSON.stringify({ error: "Erro inesperado" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
