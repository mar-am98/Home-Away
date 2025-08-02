import { toast } from 'sonner';

// File size constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
export const RECOMMENDED_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes (for better performance)

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function validateFileSize(file: File): { isValid: boolean; shouldWarn: boolean } {
  if (!file) {
    return { isValid: false, shouldWarn: false };
  }

  const isValid = file.size <= MAX_FILE_SIZE;
  const shouldWarn = file.size > RECOMMENDED_FILE_SIZE && file.size <= MAX_FILE_SIZE;

  return { isValid, shouldWarn };
}

export function showFileSizeToast(file: File): boolean {
  const { isValid, shouldWarn } = validateFileSize(file);
  const fileSize = formatFileSize(file.size);

  if (!isValid) {
    toast.error(
      `File too large: ${fileSize}`,
      {
        description: `Maximum file size is ${formatFileSize(MAX_FILE_SIZE)}. Please choose a smaller image.`,
        duration: 5000,
      }
    );
    return false;
  }

  if (shouldWarn) {
    toast.warning(
      `Large file detected: ${fileSize}`,
      {
        description: `Consider compressing your image for faster upload. Recommended size is under ${formatFileSize(RECOMMENDED_FILE_SIZE)}.`,
        duration: 4000,
      }
    );
  }

  return true;
}