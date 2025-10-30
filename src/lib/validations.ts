import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const carSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.string().min(4),
});

export const inspectionSchema = z.object({
  report: z.string().min(1),
  status: z.string().min(1),
});
