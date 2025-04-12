
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin, MessageCircle, Star } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "5521970286372";

  return (
    <footer className="bg-neutrals-light dark:bg-neutrals-dark py-12 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-teal dark:text-teal-light">
                Casa<span className="text-teal-light dark:text-white">Estudantes</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-neutrals-dark dark:text-neutrals-light">
              Encontre sua acomodação estudantil ideal na Irlanda com suporte completo em português.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutrals-dark dark:text-white">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/accommodations"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Acomodações
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Política de Reembolso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutrals-dark dark:text-white">Cidades</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/accommodations?city=dublin"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Dublin
                </Link>
              </li>
              <li>
                <Link
                  to="/accommodations?city=cork"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Cork
                </Link>
              </li>
              <li>
                <Link
                  to="/accommodations?city=galway"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Galway
                </Link>
              </li>
              <li>
                <Link
                  to="/accommodations?city=limerick"
                  className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                >
                  Limerick
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutrals-dark dark:text-white">Fale Conosco</h3>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors mb-4"
            >
              <MessageCircle size={16} />
              <span>WhatsApp: +55 21 97028-6372</span>
            </a>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center mb-6">
            <h3 className="text-lg font-semibold mb-3 text-neutrals-dark dark:text-white">Avaliações de Nossos Clientes</h3>
            <div className="flex items-center space-x-8">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <div className="bg-white dark:bg-neutrals-dark-800 px-4 py-2 rounded-lg shadow-sm flex items-center hover:shadow-md transition-shadow">
                      <img src="https://lh3.googleusercontent.com/a-/ALV-UjWKP-v03i5tWoLJEQg7QoqC8pg3QRHxdxajm_Xu=s40-c-c0x00000000-cc-rp-mo-br100" alt="Google Reviews" className="w-6 h-6 mr-2" />
                      <div>
                        <div className="text-sm font-medium">Google Reviews</div>
                        <div className="flex items-center">
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} size={14} fill="#FACC15" stroke="none" />
                            ))}
                          </div>
                          <span className="text-xs ml-1">5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <img src="https://lh3.googleusercontent.com/a-/ALV-UjWKP-v03i5tWoLJEQg7QoqC8pg3QRHxdxajm_Xu=s40-c-c0x00000000-cc-rp-mo-br100" alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                      <div>
                        <div className="text-sm font-medium">Maria S.</div>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} size={12} fill="#FACC15" stroke="none" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      "Serviço excelente! Consegui uma ótima acomodação em Dublin com facilidade graças ao atendimento personalizado."
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <div className="bg-white dark:bg-neutrals-dark-800 px-4 py-2 rounded-lg shadow-sm flex items-center hover:shadow-md transition-shadow">
                      <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/favicons/favicon.ico" alt="Trustpilot" className="w-6 h-6 mr-2" />
                      <div>
                        <div className="text-sm font-medium">Trustpilot</div>
                        <div className="flex items-center">
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} size={14} fill="#00B67A" stroke="none" />
                            ))}
                          </div>
                          <span className="text-xs ml-1">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/logo-white.svg" alt="Trustpilot" className="w-20 h-5 mr-2" />
                      <div className="flex ml-auto">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} size={12} fill="#00B67A" stroke="none" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      "Empresa confiável com ótimo suporte durante toda minha estadia na Irlanda. Recomendo!"
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutrals-dark dark:text-neutrals-light mb-4 md:mb-0">
              © {currentYear} Casa Estudantes. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/terms"
                className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/refund-policy"
                className="text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors"
              >
                Política de Reembolso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
