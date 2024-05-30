import prisma from '../../../prisma';

export const deleteDriver = (id: string) => {
  return prisma.driver.delete({ where: { id } });
};
