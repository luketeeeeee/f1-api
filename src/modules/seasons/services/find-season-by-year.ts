import prisma from '../../../prisma';

export const findSeasonByYear = (year: string) => {
  return prisma.season.findUnique({
    where: { year },
    include: {
      races: { orderBy: { race_number: 'asc' } },
      drivers: { orderBy: { name: 'asc' } },
    },
  });
};
