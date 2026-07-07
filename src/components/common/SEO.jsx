import Cloudinary from '../../constants/Cloudinary';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  name = "CR Cyber Crime Foundation", 
  type = "website",
  image = Cloudinary.logoIile24,
  url = "https://crccf.org"
}) {
  const pageTitle = title ? `${title} | ${name}` : name;
  const pageDescription = description || "CR Cyber Crime Foundation provides cyber security, cyber awareness, cyber investigation, digital safety services, training, consultancy, and digital empowerment.";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{pageTitle}</title>
      <meta name='description' content={pageDescription} />

      {/* Open Graph tags for Facebook, LinkedIn, etc. */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
