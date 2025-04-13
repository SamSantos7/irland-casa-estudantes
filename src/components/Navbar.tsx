import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, User, BookText } from "lucide-react";
import { useTheme } from "../hooks/use-theme";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-neutrals-dark shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-teal dark:text-teal-light">
            Casa<span className="text-teal-light dark:text-white">Estudantes</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors"
          >
            Home
          </Link>
          <Link
            to="/accommodations"
            className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors"
          >
            Acomodações
          </Link>
          <Link
            to="/contact"
            className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors"
          >
            Contato
          </Link>
          <button
            onClick={toggleTheme}
            className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            to="/reservation-form"
            className="bg-teal text-white dark:bg-teal-light dark:text-teal px-4 py-2 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition btn-hover-effect"
          >
            Reservar
          </Link>

          <Link
            to="/client-area"
            className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors flex items-center"
          >
            <User size={16} className="mr-2" />
            Área do Cliente
          </Link>
          <Link
            to="/blog"
            className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors flex items-center"
          >
            <BookText size={16} className="mr-2" />
            Blog
          </Link>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMenu}
            className="text-teal dark:text-teal-light"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutrals-dark shadow-md py-4 animate-fade-in">
            <div className="container flex flex-col space-y-4">
              <Link
                to="/"
                className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/accommodations"
                className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors"
                onClick={toggleMenu}
              >
                Acomodações
              </Link>
              <Link
                to="/contact"
                className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors"
                onClick={toggleMenu}
              >
                Contato
              </Link>
              <Link
                to="/reservation-form"
                className="bg-teal text-white dark:bg-teal-light dark:text-teal px-4 py-2 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition btn-hover-effect w-full text-center"
                onClick={toggleMenu}
              >
                Reservar
              </Link>

              <Link
                to="/client-area"
                className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors flex items-center"
                onClick={toggleMenu}
              >
                <User size={16} className="mr-2" />
                Área do Cliente
              </Link>
              <Link
                to="/blog"
                className="text-neutrals-dark dark:text-white hover:text-teal dark:hover:text-teal-light transition-colors flex items-center"
                onClick={toggleMenu}
              >
                <BookText size={16} className="mr-2" />
                Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
