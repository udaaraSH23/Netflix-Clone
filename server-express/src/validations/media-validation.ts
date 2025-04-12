import { z } from 'zod';

export const MediaSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  rating: z.number().optional(),
  category: z.string(),
  posterUrl: z.string().url(),
  backdropUrl: z.string().url(),
  videoUrl: z.string().url(),
  year: z.number(),
});

export type MediaInput = z.infer<typeof MediaSchema>;
