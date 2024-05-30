import { Prisma } from '@prisma/client';
import prisma from '../../../prisma';

export const createRace = (race: Prisma.RaceCreateInput) => {
  return prisma.race.create({ data: race });
};
