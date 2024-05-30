import prisma from '../../../prisma';

export const findRaceById = (id: string) => {
  return prisma.race.findUnique({ where: { id } });
};
