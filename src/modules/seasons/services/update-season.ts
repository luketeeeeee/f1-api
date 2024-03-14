import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

export const updateSeason = (
  year: string,
  season: Prisma.SeasonUpdateInput,
  raceId?: string,
  teamId?: string,
  driverId?: string,
  carId?: string
) => {
  if (raceId) {
    return prisma.season.update({
      where: { year },
      data: { races: { connect: { id: raceId } } },
    });
  } else if (teamId) {
    return prisma.season.update({
      where: { year },
      data: { teams: { connect: { id: teamId } } },
    });
  } else if (driverId) {
    return prisma.season.update({
      where: { year },
      data: { drivers: { connect: { id: driverId } } },
    });
  } else if (carId) {
    return prisma.season.update({
      where: { year },
      data: { cars: { connect: { id: carId } } },
    });
  }

  return prisma.season.update({ where: { year }, data: season });
};
