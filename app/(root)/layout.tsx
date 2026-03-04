import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Poppins } from "next/font/google";
import "./../globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playFair = Playfair_Display({
  variable: "--font-heading",
  subsets: ['latin']
})

const poppins = Poppins({
  weight: "400",
  variable: "--font-body",
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    default: "Jayone Prestige School of Fashion",
    template: "%s | Jayone Prestige School of Fashion"
  },
  description: "Jayone Prestige School of Fashion: Crafting Designers. Building Futures. Learn, create, and excel in fashion design, tailoring, and business.",
  keywords: [
    "Fashion School", "Tailoring", "Pattern Making", "Fashion Design", "Garment Technology", "Fashion Business", "Branding", "Jayone", "Ghana Fashion School", "Sewing Classes", "Fashion Programs"
  ],
  openGraph: {
    title: "Jayone Prestige School of Fashion",
    description: "Crafting Designers. Building Futures. Join Ghana's leading fashion school for design, tailoring, and business programs.",
    url: "https://jayoneprestige.com",
    siteName: "Jayone Prestige School of Fashion",
    images: [
      {
        url: "/images/hero1.jpg",
        width: 1200,
        height: 630,
        alt: "Jayone Prestige School of Fashion Hero Image"
      }
    ],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@jayonefashion",
    title: "Jayone Prestige School of Fashion",
    description: "Crafting Designers. Building Futures. Join Ghana's leading fashion school for design, tailoring, and business programs.",
    images: [
      {
        url: "/images/hero1.jpg",
        alt: "Jayone Prestige School of Fashion Hero Image"
      }
    ]
  },
  metadataBase: new URL("https://jayoneprestige.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Local SEO: Google My Business & Social Meta Tags */}
        <meta name="geo.region" content="GH-AH" />
        <meta name="geo.placename" content="Kumasi" />
        <meta name="geo.position" content="6.6884;-1.6244" />
        <meta name="ICBM" content="6.6884, -1.6244" />
        <meta name="business:contact_data:street_address" content="Kwadaso Estate" />
        <meta name="business:contact_data:locality" content="Kumasi" />
        <meta name="business:contact_data:region" content="Ashanti" />
        <meta name="business:contact_data:postal_code" content="00233" />
        <meta name="business:contact_data:country_name" content="Ghana" />
        <meta name="business:contact_data:email" content="info@jayoneprestige.com" />
        <meta name="business:contact_data:phone_number" content="+233-XXX-XXXXXX" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Jayone Prestige School of Fashion" />
        <meta property="og:url" content="https://jayoneprestige.com" />
        <meta property="og:image" content="https://jayoneprestige.com/images/hero1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Jayone Prestige School of Fashion Hero Image" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jayonefashion" />
        <meta name="twitter:title" content="Jayone Prestige School of Fashion" />
        <meta name="twitter:description" content="Crafting Designers. Building Futures. Join Ghana's leading fashion school for design, tailoring, and business programs." />
        <meta name="twitter:image" content="https://jayoneprestige.com/images/hero1.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
        {/* JSON-LD Site Schema */}
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Jayone Prestige School of Fashion",
            "url": "https://jayoneprestige.com",
            "logo": "https://jayoneprestige.com/images/hero1.jpg",
            "description": "Jayone Prestige School of Fashion: Crafting Designers. Building Futures. Learn, create, and excel in fashion design, tailoring, and business.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kwadaso Estate",
              "addressLocality": "Kumasi",
              "addressRegion": "Ashanti",
              "postalCode": "00233",
              "addressCountry": "GH"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+233-XXX-XXXXXX",
              "contactType": "Customer Service"
            },
            "sameAs": [
              "https://facebook.com/jayonefashion",
              "https://instagram.com/jayonefashion"
            ]
          })
        }} />
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${poppins.variable} ${playFair.className} ${geistMono.variable} `}>
        {children}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
