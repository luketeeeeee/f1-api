import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

export const updateSeason = (id: string, season: Prisma.SeasonUpdateInput) => {
  return prisma.season.update({ where: { id }, data: season });
};
