import imageCompression from 'browser-image-compression';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeLink(link?: string) {
  if (!link) return '';

  return link
    .replace(/\s/g, '')
    .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, '')
    .toLocaleLowerCase();
}

export async function compressFiles(files: File[]) {
  const compressPromises = files.map(async file => {
    try {
      return await compressImage(file);
    } catch (error) {
      console.error('Error compressing image:', error);
      return null;
    }
  });
  return (await Promise.all(compressPromises)).filter(file => file !== null);
}

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 900,
    useWebWorker: true,
    fileType: 'image/png',
  };
  return new Promise((resolve, reject) => {
    imageCompression(file, options)
      .then(compressedFile => {
        resolve(compressedFile);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export function formatURL(url: string) {
  const formattedURL = url.startsWith('http') ? url : `https://${url}`;
  return formattedURL;
}
