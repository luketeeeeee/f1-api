import prisma from '../../prisma';

export const findRacesByYear = (seasonYear: string) => {
  return prisma.race.findMany({ where: { seasonYear } });
};
