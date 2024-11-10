import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Eliminar todos los usuarios existentes
  await prisma.user.deleteMany({});

  // Crear usuario admin
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: '123123', // Contraseña en texto plano
      name: 'Admin User',
      role: 'admin',
    },
  });

  // Crear usuario normal
  await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: '123123', // Contraseña en texto plano
      name: 'Regular User',
      role: 'user',
    },
  });

  console.log('Usuarios creados con éxito');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
