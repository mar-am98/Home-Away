import { toast } from 'sonner';
import { imageSchema } from './schema';

// Constants from existing schema
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB - matches schema.ts
export const RECOMMENDED_FILE_SIZE = 2 * 1024 * 1024; // 2MB for better performance

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function validateImageWithToast(file: File): boolean {
  if (!file) {
    return false;
  }

  // Use the existing schema validation
  const result = imageSchema.safeParse({ image: file });
  const fileSize = formatFileSize(file.size);

  if (!result.success) {
    // Extract the error message from Zod validation
    const errorMessage = result.error.issues[0]?.message || 'Invalid file';
    
    toast.error(
      `File validation failed: ${fileSize}`,
      {
        description: errorMessage,
        duration: 5000,
      }
    );
    return false;
  }

  // Show warning for large but valid files
  if (file.size > RECOMMENDED_FILE_SIZE) {
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

export function checkImageBeforeSubmit(file: File): boolean {
  if (!file || file.size === 0) {
    return true; // No file selected, let server validation handle required field
  }

  const result = imageSchema.safeParse({ image: file });
  
  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || 'Invalid file';
    toast.error(
      'Cannot submit form',
      {
        description: errorMessage + ' Please select a valid image file.',
        duration: 5000,
      }
    );
    return false;
  }

  return true;
}