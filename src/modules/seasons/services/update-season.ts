import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

export const updateSeason = (year: string, season: Prisma.SeasonUpdateInput) => {
  return prisma.season.update({ where: { year }, data: season });
};
