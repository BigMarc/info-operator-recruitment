import type { MetadataRoute } from 'next';

const ROUTES = ['', '/v4', '/v4/success', '/privacy', '/terms', '/disclosure'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();
  for (const path of ROUTES) {
    entries.push({
      url: `https://buildforthem.de${path}`,
      lastModified: now,
      alternates: {
        languages: {
          de: `https://buildforthem.de${path}`,
          en: `https://buildforthem.com${path}`,
        },
      },
    });
    entries.push({
      url: `https://buildforthem.com${path}`,
      lastModified: now,
      alternates: {
        languages: {
          de: `https://buildforthem.de${path}`,
          en: `https://buildforthem.com${path}`,
        },
      },
    });
  }
  return entries;
}
