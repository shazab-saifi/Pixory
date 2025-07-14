import { z } from "zod";

// Constants
export const MAX_COLLECTIONS_PER_USER = 10;

// Photo validation schema
export const CollectionPhotoSchema = z.object({
  id: z.number().int().positive("Photo ID must be a positive integer"),
  alt: z
    .string()
    .min(1, "Alt text is required")
    .max(500, "Alt text cannot exceed 500 characters"),
  height: z.number().int().positive("Height must be a positive integer"),
  width: z.number().int().positive("Width must be a positive integer"),
  photographer: z
    .string()
    .min(1, "Photographer name is required")
    .max(100, "Photographer name cannot exceed 100 characters"),
  photographerUrl: z.string().url("Photographer URL must be a valid URL"),
  original: z.string().url("Original image URL must be a valid URL"),
  large: z.string().url("Large image URL must be a valid URL"),
  portrait: z.string().url("Portrait image URL must be a valid URL"),
  landscape: z.string().url("Landscape image URL must be a valid URL"),
});

// Collection validation schemas
export const CreateCollectionSchema = z.object({
  collectionName: z
    .string()
    .min(1, "Collection name is required!")
    .max(100, "Collection name cannot exceed 100 characters!")
    .trim()
    .refine((name) => name.length > 0, "Collection name cannot be empty!"),
});

// User authentication schemas
export const SignupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(1, { message: "Name is required!" })
    .max(40, { message: "Name cannot be longer than 40 characters!" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 characters" })
    .max(40, { message: "Password cannot be longer than 40 characters" }),
});

export const SigninSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

// Type exports
export type CreateCollectionInput = z.infer<typeof CreateCollectionSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
