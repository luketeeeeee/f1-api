import { Prisma } from '@prisma/client';
import prisma from '../../../prisma';

export const createSeason = (season: Prisma.SeasonCreateInput) => {
  return prisma.season.create({ data: season });
};
