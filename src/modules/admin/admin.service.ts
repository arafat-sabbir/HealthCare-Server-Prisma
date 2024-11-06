import { Prisma } from '@prisma/client';
import { prisma } from '../../app';
import { adminSearchAbleField } from './admin.const';

const getAllAdminFromDb = async (params: any) => {
  const { searchTerm, ...filterData } = params; // Extract searchTerm, and collect the rest into filterData
  const andConditions: Prisma.AdminWhereInput[] = [];
  const adminSearchAbleFields = adminSearchAbleField;

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const result = await prisma.admin.findMany({
    where: {
      AND: andConditions,
    },
  });

  return result;
};

export const adminServices = {
  getAllAdminFromDb,
};
