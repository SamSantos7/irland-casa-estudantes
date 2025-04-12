
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  altText?: string;
}

const SEO = ({
  title = "Acomodações estudantis na Irlanda | Irlanda Casa Estudantes",
  description = "Residências estudantis em Dublin, Cork, Galway e Limerick com suporte em português. Encontre acomodação segura e de qualidade para seu intercâmbio na Irlanda.",
  canonical = "",
  image = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXJlbGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  altText = "Paisagem da Irlanda com acomodações estudantis",
}: SEOProps) => {
  const siteUrl = window.location.origin; // Pega a URL base do site
  const fullUrl = canonical ? `${siteUrl}${canonical}` : window.location.href;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={altText} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content={altText} />
    </Helmet>
  );
};

export default SEO;
