import prisma from '../../../prisma';

export const deleteSeason = (year: string) => {
  return prisma.season.delete({ where: { year } });
};
