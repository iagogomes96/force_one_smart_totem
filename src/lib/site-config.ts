import rawConfig from '../../config.json';

export const siteConfig = rawConfig;

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
export const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';

export function assetPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function sitePath(path: string) {
  if (!path.startsWith('/')) return path;
  return assetPath(path);
}

type WhatsAppMessageFields = {
  name: string;
  city: string;
  projectType: string;
};

export function buildWhatsAppUrl(fields: WhatsAppMessageFields) {
  const replacements: Record<keyof WhatsAppMessageFields, string> = {
    name: fields.name,
    city: fields.city,
    projectType: fields.projectType,
  };

  const message = siteConfig.whatsappMessageTemplate.replace(
    /\{(name|city|projectType)\}/g,
    (_, key: keyof WhatsAppMessageFields) => replacements[key],
  );
  const number = siteConfig.contact.whatsappNumber.replace(/\D/g, '');
  const destination = number ? `https://wa.me/${number}` : 'https://wa.me/';

  return `${destination}?text=${encodeURIComponent(message)}`;
}
