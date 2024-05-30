import prisma from '../../../prisma';
import { Prisma } from '@prisma/client';

export const updateRace = (id: string, data: Prisma.RaceUpdateInput) => {
  return prisma.race.update({ where: { id }, data: data });
};
