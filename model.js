const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// getAllData(): Recupera todos los registros de la tabla 
// "users" utilizando el método findMany() de Prisma.
async function getAllData() {
  const records = await prisma.users.findMany();
  return records;
}

// getDataById(id): Recupera un registro específico por su 
// ID utilizando el método findUnique() de Prisma.
async function getDataById(id) {
  const record = await prisma.users.findUnique({
    where: {
      id : Number(id)
    }
  });
  return record;
}

// createData(data): Crea un nuevo registro en la tabla 
// "users" utilizando el método create() de Prisma.
async function createData(data) {
  const record = await prisma.users.create({
    data: {
      name: data.name,
      phone: data.phone
    }
  });
  return record;
}

// updateData(id, data): Actualiza un registro existente en
// la tabla "users" utilizando el método upsert() de Prisma.
async function updateData(id, user) {
  const record = await prisma.users.update({
    where: {
      id: Number(id)
    },
    data: {
      ...user
    }
  });
  return record;
}

// deleteData(id): Elimina un registro específico por su 
// ID utilizando el método delete() de Prisma.
async function deleteData(id) {
  const record = await prisma.users.delete({
    where: {
      id: Number(id)
    }
  });
  return record;
}

async function getLength() {
  const records = await prisma.users.findMany();
  return records.length;
}

module.exports = {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
  getLength
};
