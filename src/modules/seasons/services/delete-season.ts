import prisma from '../../prisma';

export const deleteSeason = (id: string) => {
  return prisma.season.delete({ where: { id } });
};
