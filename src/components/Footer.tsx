
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              href="https://wa.me/353000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutrals-dark dark:text-neutrals-light hover:text-teal dark:hover:text-teal-light transition-colors mb-4"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
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

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6">
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
