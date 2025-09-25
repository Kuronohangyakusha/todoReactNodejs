import { PrismaClient, Droit, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Supprimer toutes les données existantes
  await prisma.permission.deleteMany();
  await prisma.tache.deleteMany();
  await prisma.user.deleteMany();

  // Création des utilisateurs
  const admin = await prisma.user.create({
    data: {
      login: "admin",
      password: "admin123",
      role: Role.ADMIN,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      login: "user1",
      password: "user123",
      role: Role.SIMPLE,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      login: "user2",
      password: "user456",
      role: Role.SIMPLE,
    },
  });

  // Création des tâches
  const tache1 = await prisma.tache.create({
    data: {
      nom: "Faire les devoirs",
      description: "Terminer les exercices de maths",
      userId: admin.id,
      status: false,
    },
  });

  const tache2 = await prisma.tache.create({
    data: {
      nom: "Réunion projet",
      description: "Préparer la présentation",
      userId: admin.id,
      status: true,
    },
  });

  const tache3 = await prisma.tache.create({
    data: {
      nom: "Faire le ménage",
      description: "Nettoyer la maison",
      userId: user1.id,
      status: false,
    },
  });

  // Attribution des permissions avec upsert (évite les doublons)
  await prisma.permission.upsert({
    where: { userId_tacheId: { userId: user1.id, tacheId: tache1.id } },
    update: { droit: Droit.LIRE },
    create: { userId: user1.id, tacheId: tache1.id, droit: Droit.LIRE },
  });

  await prisma.permission.upsert({
    where: { userId_tacheId: { userId: user2.id, tacheId: tache2.id } },
    update: { droit: Droit.LIRE },
    create: { userId: user2.id, tacheId: tache2.id, droit: Droit.LIRE },
  });

  await prisma.permission.upsert({
    where: { userId_tacheId: { userId: user2.id, tacheId: tache3.id } },
    update: { droit: Droit.MODIFIER },
    create: { userId: user2.id, tacheId: tache3.id, droit: Droit.MODIFIER },
  });

  console.log("Seed mis à jour avec succès !");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
