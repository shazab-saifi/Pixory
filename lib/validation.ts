import { z } from "zod";

// Constants
export const MAX_COLLECTIONS_PER_USER = 10;

// Photo validation schema
export const CollectionPhotoSchema = z.object({
  id: z.number(),
  alt: z.string().max(500, "Alt text cannot exceed 500 characters"),
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

export const CollectionVideoFileSchema = z.object({
  id: z.number(),
  quality: z.string(),
  width: z.number().int().positive("Width must be a positive integer"),
  height: z.number().int().positive("Height must be a positive integer"),
  fileType: z.string(),
  link: z.string().url("Video file link must be a valid URL"),
  videoId: z.number(),
});

// Video validation schema for CollectionMedia
export const CollectionVideoSchema = z.object({
  id: z.number(),
  width: z.number().int().positive("Width must be a positive integer"),
  height: z.number().int().positive("Height must be a positive integer"),
  url: z.string().url("Video URL must be a valid URL"),
  image: z.string().url("Image URL must be a valid URL"),
  videographer: z.string().min(1, "Videographer name is required"),
  videographerUrl: z.string().url("Videographer URL must be a valid URL"),
  videoFiles: z.array(CollectionVideoFileSchema).optional(),
});

// Collection validation schemas
export const CreateCollectionSchema = z.object({
  collectionName: z
    .string()
    .min(1, "Collection name is required!")
    .max(100, "Collection name cannot exceed 100 characters!")
    .trim()
    .refine((name) => name.length > 0, "Collection name cannot be empty!"),
  photoData: CollectionPhotoSchema.optional(),
  videoData: CollectionVideoSchema.optional(),
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

// CollectionMedia validation schema
export const CollectionMediaSchema = z.object({
  id: z.number().optional(),
  photoId: z.number().optional(),
  photo: CollectionPhotoSchema.optional(),
  videoId: z.number().optional(),
  video: CollectionVideoSchema.optional(),
  collectionId: z.number(),
});

export const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(1, { message: "Name is required!" })
    .max(40, { message: "Name cannnot be longer than 40 characters!" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 characters" })
    .max(40, { message: "Password cannot be longer than 40 characters" }),
});

// Type exports
export type CreateCollectionInput = z.infer<typeof CreateCollectionSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
export type CollectionMediaInput = z.infer<typeof CollectionMediaSchema>;
