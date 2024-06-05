import prisma from '../../../prisma';

export const findRacesByYear = (season_year: string) => {
  return prisma.race.findMany({
    orderBy: [
      {
        race_number: 'asc',
      },
    ],
    where: { season_year },
  });
};
