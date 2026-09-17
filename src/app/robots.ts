import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://basic-need.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/dashboard/', 
        '/api/admin/',
        '/api/auth/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
