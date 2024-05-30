import { Prisma } from '@prisma/client';
import prisma from '../../../prisma';

export const createManySeasons = (seasons: Prisma.SeasonCreateManyInput) => {
  return prisma.season.createMany({ data: seasons, skipDuplicates: true });
};
