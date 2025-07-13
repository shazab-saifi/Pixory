import { z } from "zod";

// Constants
export const MAX_COLLECTIONS_PER_USER = 10;

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
