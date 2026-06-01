const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd';

export function getAssetOrigin() {
  if (import.meta.env.VITE_ASSET_BASE_URL) {
    return import.meta.env.VITE_ASSET_BASE_URL.replace(/\/$/, '');
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl.split('/api')[0];
  }

  return 'http://localhost:5000';
}

export default function getImageUrl(image) {
  if (!image) return DEFAULT_PLACEHOLDER;
  if (typeof image !== 'string') return image;

  if (image.startsWith('/uploads')) {
    return `${getAssetOrigin()}${image}`;
  }

  return image;
}
