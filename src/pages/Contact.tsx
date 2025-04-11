
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { 
  MessageSquare, 
  Mail, 
  Send, 
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
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
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      
      toast.success("Mensagem enviada com sucesso! Responderemos em breve.", {
        position: "bottom-center",
        icon: <CheckCircle2 className="text-green-500" />,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Page Header */}
        <section className="bg-teal dark:bg-teal py-12">
          <div className="container">
            <h1 className="text-3xl font-bold text-white">Entre em Contato</h1>
            <p className="text-white/80 mt-2">
              Estamos aqui para ajudar com qualquer dúvida
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 shadow-md h-full">
                  <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-6">
                    Informações de Contato
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="text-teal dark:text-teal-light" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutrals-dark dark:text-white">
                          Endereço
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          Dublin City Centre, Irlanda
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="text-teal dark:text-teal-light" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutrals-dark dark:text-white">
                          E-mail
                        </h3>
                        <a
                          href="mailto:contato@casaestudantes.com"
                          className="text-teal dark:text-teal-light hover:underline mt-1 block"
                        >
                          contato@casaestudantes.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="text-teal dark:text-teal-light" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutrals-dark dark:text-white">
                          WhatsApp
                        </h3>
                        <a
                          href="https://wa.me/353000000000"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal dark:text-teal-light hover:underline mt-1 block"
                        >
                          +353 (0) 00 000 0000
                        </a>
                      </div>
                    </div>

                    <div className="pt-6">
                      <h3 className="font-medium text-neutrals-dark dark:text-white mb-3">
                        Redes Sociais
                      </h3>
                      <div className="flex space-x-4">
                        <a
                          href="#"
                          className="h-10 w-10 rounded-full bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center text-teal dark:text-teal-light hover:bg-teal hover:text-white dark:hover:bg-teal-light dark:hover:text-teal transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram size={20} />
                        </a>
                        <a
                          href="#"
                          className="h-10 w-10 rounded-full bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center text-teal dark:text-teal-light hover:bg-teal hover:text-white dark:hover:bg-teal-light dark:hover:text-teal transition-colors"
                          aria-label="Facebook"
                        >
                          <Facebook size={20} />
                        </a>
                        <a
                          href="#"
                          className="h-10 w-10 rounded-full bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center text-teal dark:text-teal-light hover:bg-teal hover:text-white dark:hover:bg-teal-light dark:hover:text-teal transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <a
                      href="https://wa.me/353000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition btn-hover-effect"
                    >
                      <MessageSquare size={20} />
                      <span>Conversar no WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-6">
                    Envie-nos uma Mensagem
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1"
                        >
                          Nome Completo*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1"
                        >
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
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1"
                      >
                        Telefone (opcional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1"
                      >
                        Mensagem*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                        required
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className={`flex items-center justify-center w-full bg-teal dark:bg-teal-light text-white dark:text-teal font-medium py-3 px-6 rounded-lg transition ${
                          submitting
                            ? "opacity-75 cursor-not-allowed"
                            : "hover:bg-opacity-90 dark:hover:bg-opacity-90 btn-hover-effect"
                        }`}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            <span>Enviar Mensagem</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Map or Additional Info */}
            <div className="mt-12">
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-6">
                  Nossa Localização
                </h2>
                <div className="h-80 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.98633132553!2d-6.3857513558959484!3d53.32444313848332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin%2C%20Ireland!5e0!3m2!1sen!2sbr!4v1677047092951!5m2!1sen!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização da Casa Estudantes"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton phoneNumber="353000000000" />
    </div>
  );
};

export default Contact;
