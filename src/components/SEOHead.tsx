import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Advance Forte - Best IIT-JEE, NEET & Foundation Coaching in Delhi, Gailgaon, Auraiya, UP, Bihar | Top Coaching Institute',
  description = 'Advance Forte - Premier coaching institute for IIT-JEE, NEET & Foundation courses in Delhi, Gailgaon, Dibiyapur, Auraiya, UP, Bihar. Expert faculty, proven results, scholarship programs. Join 10,000+ successful students.',
  keywords = 'IIT JEE coaching Delhi, NEET coaching Gailgaon, Foundation courses Auraiya, best coaching institute UP, IIT JEE preparation Bihar, NEET coaching Dibiyapur, Advance Forte coaching, competitive exam coaching Delhi NCR, medical entrance coaching UP, engineering entrance coaching Bihar, JEE Main coaching Gailgaon, NEET UG coaching Auraiya, foundation coaching Delhi, scholarship coaching institute, top coaching center UP Bihar, IIT coaching Uttar Pradesh, NEET preparation Delhi NCR, best coaching Gailgaon Dibiyapur',
  canonicalUrl = 'https://www.advanceforte.in',
  ogImage = 'https://www.advanceforte.in/logo.jpg',
}) => {
  return (
    <Helmet>
      {/* Enhanced Title and Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Advance Forte" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Location-Based SEO */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Gailgaon, Dibiyapur, Auraiya, Delhi, UP, Bihar" />
      <meta name="geo.position" content="26.4499;79.0728" />
      <meta name="ICBM" content="26.4499, 79.0728" />
      <meta name="location" content="Delhi, Gailgaon, Dibiyapur, Auraiya, Uttar Pradesh, Bihar, Delhi NCR, North India" />
      <meta name="coverage" content="Delhi, UP, Bihar, Uttar Pradesh, Delhi NCR, Gailgaon, Auraiya, Dibiyapur" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Advance Forte - Best IIT-JEE, NEET & Foundation Coaching in Delhi, Gailgaon, Auraiya" />
      <meta property="og:description" content="Premier coaching institute for IIT-JEE, NEET & Foundation courses. Expert faculty, proven results, scholarship programs in Delhi, UP, Bihar." />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Advance Forte" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Advance Forte - Best IIT-JEE, NEET & Foundation Coaching" />
      <meta name="twitter:description" content="Premier coaching institute for competitive exams in Delhi, Gailgaon, Auraiya, UP, Bihar. Join 10,000+ successful students." />
      <meta name="twitter:image" content={ogImage} />
      
      <link rel="canonical" href={canonicalUrl} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Structured Data for Educational Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Advance Forte",
          "description": "Premier coaching institute for IIT-JEE, NEET & Foundation courses",
          "url": canonicalUrl,
          "logo": `${canonicalUrl}/logo.jpg`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "D 60/61, Sewak Park",
            "addressLocality": "Dwarka",
            "addressRegion": "Delhi",
            "postalCode": "110059",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8853123199",
            "contactType": "customer service"
          },
          "areaServed": [
            "Delhi",
            "Gailgaon",
            "Dibiyapur", 
            "Auraiya",
            "Uttar Pradesh",
            "Bihar",
            "Delhi NCR"
          ],
          "serviceType": [
            "IIT-JEE Coaching",
            "NEET Coaching",
            "Foundation Courses",
            "Competitive Exam Preparation"
          ],
          "hasCredential": "Expert Faculty with IIT/NIT Background",
          "alumni": "10000+ Successful Students"
        })}
      </script>
      
      {/* Local Business Schema for Gailgaon Branch */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Advance Forte Gailgaon",
          "description": "Best IIT-JEE, NEET & Foundation coaching in Gailgaon, Dibiyapur, Auraiya",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Gailgaon",
            "addressLocality": "Dibiyapur",
            "addressRegion": "Auraiya, Uttar Pradesh",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "26.4499",
            "longitude": "79.0728"
          },
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "26.4499",
              "longitude": "79.0728"
            },
            "geoRadius": "100000"
          },
          "telephone": "+91-8853123199",
          "priceRange": "$$",
          "openingHours": "Mo-Su 08:00-20:00"
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;