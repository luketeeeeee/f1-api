import prisma from '../../prisma';

export const findByYear = (year: string) => {
  return prisma.season.findUnique({ where: { year } });
};
