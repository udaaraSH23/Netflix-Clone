import { z } from 'zod';

const CreateMovieSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  rating: z.number(),
  category: z.string(),
  posterUrl: z.string().url(),
  backdropUrl: z.string().url(),
  videoUrl: z.string().url(),
  year: z.number(),
});

export type CreateMovieInput = z.infer<typeof CreateMovieSchema>;
