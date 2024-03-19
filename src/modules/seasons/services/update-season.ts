import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

export const updateSeason = (
  year: string,
  season: Prisma.SeasonUpdateInput,
  newRelatedObjectType?: string,
  relatedObjectId?: string
) => {
  if (newRelatedObjectType === 'race') {
    return prisma.season.update({
      where: { year },
      data: { races: { connect: { id: relatedObjectId } } },
    });
  }

  if (newRelatedObjectType === 'team') {
    return prisma.season.update({
      where: { year },
      data: { teams: { connect: { id: relatedObjectId } } },
    });
  }

  if (newRelatedObjectType === 'driver') {
    return prisma.season.update({
      where: { year },
      data: { drivers: { connect: { id: relatedObjectId } } },
    });
  }

  if (newRelatedObjectType === 'car') {
    return prisma.season.update({
      where: { year },
      data: { cars: { connect: { id: relatedObjectId } } },
    });
  }

  return prisma.season.update({ where: { year }, data: season });
};
