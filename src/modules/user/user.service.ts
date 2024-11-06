import { UserRole } from '@prisma/client';
import { prisma } from '../../app';
import bcrypt from 'bcrypt';

const createAdminIntoDb = async (payload: any) => {
  const hashedPassword = bcrypt.hashSync(payload.password, 10);
  const userData = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const newAdmin = await transactionClient.admin.create({
      data: { ...payload.admin },
    });
    return newAdmin;
  });
  return result;
};

export const userServices = {
  createAdminIntoDb,
};
