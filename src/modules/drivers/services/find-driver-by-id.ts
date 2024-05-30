import prisma from '../../../prisma';

export const findDriverById = (id: string) => {
  return prisma.driver.findUnique({ where: { id } });
};
