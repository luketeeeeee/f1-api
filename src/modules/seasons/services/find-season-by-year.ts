import prisma from '../../prisma';

export const findSeasonByYear = (year: string) => {
  return prisma.season.findUnique({ where: { year } });
};
