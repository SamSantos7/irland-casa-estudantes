
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { FileText, BookText, Compass, GraduationCap } from "lucide-react";

// Lista de categorias do blog
const categories = [
  { id: "all", name: "Todos" },
  { id: "dublin", name: "Vida em Dublin" },
  { id: "accommodation", name: "Tipos de Acomodação" },
  { id: "students", name: "Dicas para Estudantes" },
];

// Lista de artigos do blog (mockup data)
const blogArticles = [
  {
    id: 1,
    title: "Como é morar em Dublin: guia completo para estudantes brasileiros",
    excerpt: "Descubra como é a vida na capital irlandesa, custo de vida, transporte, lazer e dicas exclusivas para brasileiros que estão chegando.",
    imageUrl: "https://images.unsplash.com/photo-1565795188633-53643f26693a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHVibGlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    date: "12 de abril, 2025",
    category: "dublin",
    readingTime: "8 min de leitura",
    featured: true,
  },
  {
    id: 2,
    title: "Diferença entre tipos de acomodação estudantil na Irlanda",
    excerpt: "Entenda as diferenças entre quartos individuais, compartilhados, homestay e residências estudantis para fazer a melhor escolha.",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    date: "8 de abril, 2025",
    category: "accommodation",
    readingTime: "6 min de leitura",
    featured: false,
  },
  {
    id: 3,
    title: "5 dicas essenciais para estudantes brasileiros na Irlanda",
    excerpt: "O que você precisa saber antes de chegar: documentação, adaptação cultural, clima, economia e network com outros brasileiros.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0dWRlbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    date: "5 de abril, 2025",
    category: "students",
    readingTime: "5 min de leitura",
    featured: false,
  },
  {
    id: 4,
    title: "Guia de bairros em Dublin: onde morar durante os estudos",
    excerpt: "Conheça os melhores bairros para estudantes em Dublin, com informações sobre preços, transporte, segurança e vida noturna.",
    imageUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVibGluJTIwc3RyZWV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    date: "1 de abril, 2025",
    category: "dublin",
    readingTime: "7 min de leitura",
    featured: false,
  },
  {
    id: 5,
    title: "Como economizar durante seu intercâmbio na Irlanda",
    excerpt: "Dicas práticas para economizar em hospedagem, alimentação, transporte e lazer sem comprometer a qualidade da sua experiência.",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2F2ZSUyMG1vbmV5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    date: "28 de março, 2025",
    category: "students",
    readingTime: "6 min de leitura",
    featured: false,
  },
  {
    id: 6,
    title: "Homestay vs. Residência Estudantil: prós e contras",
    excerpt: "Análise detalhada das vantagens e desvantagens de cada tipo de acomodação para ajudar na sua decisão.",
    imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXN0YXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    date: "25 de março, 2025",
    category: "accommodation",
    readingTime: "8 min de leitura",
    featured: false,
  }
];

interface BlogCardProps {
  article: {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    date: string;
    category: string;
    readingTime: string;
    featured?: boolean;
  };
}

const BlogCard = ({ article }: BlogCardProps) => {
  const categoryName = categories.find(cat => cat.id === article.category)?.name || article.category;
  
  return (
    <Link 
      to={`/blog/${article.id}`} 
      className={`block bg-white dark:bg-neutrals-dark rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ${article.featured ? 'col-span-full md:col-span-2 md:flex' : ''}`}
    >
      <div className={`relative ${article.featured ? 'md:w-1/2' : 'w-full'}`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-teal dark:bg-teal-light text-white dark:text-teal px-3 py-1 rounded-full text-xs font-semibold">
          {categoryName}
        </div>
      </div>
      <div className={`p-6 ${article.featured ? 'md:w-1/2' : ''}`}>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span>{article.readingTime}</span>
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-neutrals-dark dark:text-white mb-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <span className="text-teal dark:text-teal-light font-medium text-sm inline-flex items-center">
          Ler mais <span className="ml-2">→</span>
        </span>
      </div>
    </Link>
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredArticles = activeCategory === "all" 
    ? blogArticles 
    : blogArticles.filter(article => article.category === activeCategory);
  
  const featuredArticle = blogArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured || activeCategory !== "all");

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Blog | Dicas para Estudantes Brasileiros na Irlanda"
        description="Artigos e dicas para estudantes brasileiros na Irlanda. Saiba tudo sobre moradia, custo de vida, cultura e dicas para estudantes em Dublin, Cork, Galway e Limerick."
        canonical="/blog"
      />
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-teal dark:bg-teal py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog Casa Estudantes</h1>
            <p className="text-white/90 text-lg">
              Dicas e informações para estudantes brasileiros na Irlanda
            </p>
          </div>
        </section>

        {/* Blog Categories */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="container">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-teal dark:bg-teal-light text-white dark:text-teal"
                      : "bg-gray-100 dark:bg-gray-800 text-neutrals-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog Posts */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeCategory === "all" && featuredArticle && (
                <BlogCard article={featuredArticle} />
              )}
              {regularArticles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Nenhum artigo encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Não encontramos artigos nesta categoria no momento.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveCategory("all")}
                >
                  Ver todos os artigos
                </Button>
              </div>
            )}

            {/* Topic Guides */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-neutrals-dark dark:text-white">
                Guias por tema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="w-12 h-12 bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center rounded-full mb-4">
                    <Compass className="text-teal dark:text-teal-light" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neutrals-dark dark:text-white">
                    Guia de Cidades Irlandesas
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Descubra as melhores regiões para morar em Dublin, Cork, Galway e Limerick.
                  </p>
                  <Link 
                    to="/blog?category=dublin" 
                    className="text-teal dark:text-teal-light font-medium inline-flex items-center"
                    onClick={() => setActiveCategory("dublin")}
                  >
                    Explorar <span className="ml-2">→</span>
                  </Link>
                </div>

                <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="w-12 h-12 bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center rounded-full mb-4">
                    <BookText className="text-teal dark:text-teal-light" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neutrals-dark dark:text-white">
                    Acomodações Explicadas
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Entenda os diferentes tipos de moradia disponíveis para estudantes na Irlanda.
                  </p>
                  <Link 
                    to="/blog?category=accommodation" 
                    className="text-teal dark:text-teal-light font-medium inline-flex items-center"
                    onClick={() => setActiveCategory("accommodation")}
                  >
                    Explorar <span className="ml-2">→</span>
                  </Link>
                </div>

                <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="w-12 h-12 bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center rounded-full mb-4">
                    <GraduationCap className="text-teal dark:text-teal-light" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neutrals-dark dark:text-white">
                    Dicas para Estudantes
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Tudo o que você precisa saber para ter uma experiência de sucesso na Irlanda.
                  </p>
                  <Link 
                    to="/blog?category=students" 
                    className="text-teal dark:text-teal-light font-medium inline-flex items-center"
                    onClick={() => setActiveCategory("students")}
                  >
                    Explorar <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Sign-up */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutrals-dark dark:text-white">
                Receba nossas novidades
              </h2>
              <p className="text-muted-foreground mb-6">
                Inscreva-se para receber artigos, dicas e novidades sobre a vida estudantil na Irlanda.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
                  required
                />
                <Button className="bg-teal hover:bg-teal/90 dark:bg-teal-light dark:hover:bg-teal-light/90 text-white dark:text-teal">
                  Inscrever-se
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton phoneNumber="353000000000" />
    </div>
  );
};

export default Blog;
