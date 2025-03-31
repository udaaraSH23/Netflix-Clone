import { z } from "zod";

// Define a schema for the request body
export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type for the validated data
export type RegisterRequestBody = z.infer<typeof registerSchema>;
