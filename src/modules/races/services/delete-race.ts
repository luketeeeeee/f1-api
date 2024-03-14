import prisma from '../../prisma';

export const deleteRace = (id: string) => {
  return prisma.race.delete({ where: { id } });
};
