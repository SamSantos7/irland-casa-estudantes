
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { 
  Upload, 
  Calendar, 
  Check, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const ReservationForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accommodationId = searchParams.get("accommodation");
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    city: accommodationId ? "" : "dublin",
    checkIn: "",
    checkOut: "",
    roomType: accommodationId ? "" : "individual",
    schoolName: "",
    passportFile: null as File | null,
    enrollmentFile: null as File | null,
    paymentCurrency: "eur",
    comments: "",
    agreeTerms: false,
  });

  const [passportFileName, setPassportFileName] = useState("");
  const [enrollmentFileName, setEnrollmentFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "passport" | "enrollment") => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (fileType === "passport") {
        setFormData({
          ...formData,
          passportFile: files[0],
        });
        setPassportFileName(files[0].name);
      } else {
        setFormData({
          ...formData,
          enrollmentFile: files[0],
        });
        setEnrollmentFileName(files[0].name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.fullName || !formData.email || !formData.whatsapp || !formData.city || 
        !formData.checkIn || !formData.checkOut || !formData.roomType || !formData.schoolName ||
        !formData.passportFile || !formData.enrollmentFile || !formData.agreeTerms) {
      toast.error("Por favor, preencha todos os campos obrigatórios.", {
        position: "bottom-center",
        icon: <AlertCircle className="text-red-500" />,
      });
      return;
    }

    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      toast.success("Reserva enviada com sucesso!", {
        position: "bottom-center",
        icon: <CheckCircle2 className="text-green-500" />,
      });
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="container py-16 text-center">
            <div className="mx-auto max-w-lg bg-white dark:bg-neutrals-dark rounded-2xl p-8 shadow-md">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-4">
                Reserva Enviada com Sucesso!
              </h1>
              <p className="text-muted-foreground mb-6">
                Recebemos sua solicitação. Em até 24 horas, você receberá um e-mail com as próximas etapas 
                para confirmar sua reserva.
              </p>
              <p className="text-muted-foreground mb-8">
                Para qualquer dúvida, entre em contato pelo nosso WhatsApp.
              </p>
              <a
                href="/"
                className="inline-block bg-teal dark:bg-teal-light text-white dark:text-teal px-6 py-3 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition"
              >
                Voltar para a Página Inicial
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-neutrals-dark dark:text-white mb-2">
              Solicitar Reserva
            </h1>
            <p className="text-muted-foreground mb-8">
              Preencha o formulário abaixo para solicitar sua reserva. Nossa equipe entrará em contato
              em até 24 horas para confirmar disponibilidade.
            </p>

            <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 md:p-8 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-teal dark:bg-teal-light text-white dark:text-teal flex items-center justify-center text-sm mr-2">
                      1
                    </span>
                    Informações Pessoais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        Nome Completo*
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        E-mail*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        WhatsApp (com código do país)*
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="Ex: +5511999999999"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Accommodation Details */}
                <div>
                  <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-teal dark:bg-teal-light text-white dark:text-teal flex items-center justify-center text-sm mr-2">
                      2
                    </span>
                    Detalhes da Acomodação
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        Cidade*
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                        required
                      >
                        <option value="">Selecione uma cidade</option>
                        <option value="dublin">Dublin</option>
                        <option value="cork">Cork</option>
                        <option value="galway">Galway</option>
                        <option value="limerick">Limerick</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="roomType" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        Tipo de Quarto*
                      </label>
                      <select
                        id="roomType"
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                        required
                      >
                        <option value="">Selecione um tipo</option>
                        <option value="individual">Quarto Individual</option>
                        <option value="shared">Quarto Compartilhado</option>
                        <option value="double">Quarto de Casal</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="checkIn" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        Check-in*
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                          required
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal dark:text-teal-light" size={18} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="checkOut" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        Check-out*
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                          required
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal dark:text-teal-light" size={18} />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="schoolName" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        Nome da Escola*
                      </label>
                      <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-teal dark:bg-teal-light text-white dark:text-teal flex items-center justify-center text-sm mr-2">
                      3
                    </span>
                    Documentos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutrals-dark dark:text-white mb-2">
                        Passaporte*
                      </label>
                      <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          id="passportFile"
                          name="passportFile"
                          onChange={(e) => handleFileChange(e, "passport")}
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                        <label
                          htmlFor="passportFile"
                          className="cursor-pointer flex flex-col items-center justify-center py-4"
                        >
                          <Upload className="h-10 w-10 text-teal dark:text-teal-light mb-2" />
                          {passportFileName ? (
                            <span className="text-sm text-neutrals-dark dark:text-white break-all">
                              {passportFileName}
                            </span>
                          ) : (
                            <>
                              <span className="text-sm font-medium text-teal dark:text-teal-light">
                                Clique para fazer upload
                              </span>
                              <span className="text-xs text-muted-foreground mt-1">
                                PDF, JPG, PNG (máx. 10MB)
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutrals-dark dark:text-white mb-2">
                        Comprovante de Matrícula*
                      </label>
                      <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          id="enrollmentFile"
                          name="enrollmentFile"
                          onChange={(e) => handleFileChange(e, "enrollment")}
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                        <label
                          htmlFor="enrollmentFile"
                          className="cursor-pointer flex flex-col items-center justify-center py-4"
                        >
                          <Upload className="h-10 w-10 text-teal dark:text-teal-light mb-2" />
                          {enrollmentFileName ? (
                            <span className="text-sm text-neutrals-dark dark:text-white break-all">
                              {enrollmentFileName}
                            </span>
                          ) : (
                            <>
                              <span className="text-sm font-medium text-teal dark:text-teal-light">
                                Clique para fazer upload
                              </span>
                              <span className="text-xs text-muted-foreground mt-1">
                                PDF, JPG, PNG (máx. 10MB)
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-teal dark:bg-teal-light text-white dark:text-teal flex items-center justify-center text-sm mr-2">
                      4
                    </span>
                    Informações Adicionais
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="paymentCurrency" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        Moeda de Pagamento Preferida*
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentCurrency"
                            value="eur"
                            checked={formData.paymentCurrency === "eur"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                              formData.paymentCurrency === "eur"
                                ? "border-teal dark:border-teal-light"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {formData.paymentCurrency === "eur" && (
                              <div className="w-3 h-3 bg-teal dark:bg-teal-light rounded-full"></div>
                            )}
                          </div>
                          <span className="text-neutrals-dark dark:text-white">Euro (€)</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentCurrency"
                            value="brl"
                            checked={formData.paymentCurrency === "brl"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                              formData.paymentCurrency === "brl"
                                ? "border-teal dark:border-teal-light"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {formData.paymentCurrency === "brl" && (
                              <div className="w-3 h-3 bg-teal dark:bg-teal-light rounded-full"></div>
                            )}
                          </div>
                          <span className="text-neutrals-dark dark:text-white">Real (R$)</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comments" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                        Observações (opcional)
                      </label>
                      <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                        placeholder="Informe detalhes adicionais ou preferências específicas..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="pt-4">
                  <label className="flex items-start">
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          formData.agreeTerms
                            ? "bg-teal dark:bg-teal-light border-teal dark:border-teal-light"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        onClick={() => setFormData({ ...formData, agreeTerms: !formData.agreeTerms })}
                      >
                        {formData.agreeTerms && (
                          <Check size={14} className="text-white dark:text-teal" />
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-neutrals-dark dark:text-white">
                      Li e concordo com os{" "}
                      <a 
                        href="/terms" 
                        className="text-teal dark:text-teal-light hover:underline"
                      >
                        Termos de Uso
                      </a>{" "}
                      e{" "}
                      <a 
                        href="/privacy" 
                        className="text-teal dark:text-teal-light hover:underline"
                      >
                        Política de Privacidade
                      </a>
                      .*
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className={`w-full bg-teal dark:bg-teal-light text-white dark:text-teal font-medium py-3 px-4 rounded-lg transition btn-hover-effect flex items-center justify-center ${
                      submitting ? "opacity-75 cursor-not-allowed" : "hover:bg-opacity-90 dark:hover:bg-opacity-90"
                    }`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        <span>Processando...</span>
                      </>
                    ) : (
                      "Enviar Reserva"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton phoneNumber="353000000000" message="Olá! Tenho dúvidas sobre como fazer uma reserva." />
    </div>
  );
};

export default ReservationForm;
