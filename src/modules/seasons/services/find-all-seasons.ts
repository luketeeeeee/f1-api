import prisma from '../../../prisma';

export const findAllSeasons = () => {
  return prisma.season.findMany({});
};
