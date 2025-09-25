import { PrismaClient, Droit, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Supprimer toutes les données existantes
  await prisma.historique.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.tache.deleteMany();
  await prisma.user.deleteMany();

  // Création des utilisateurs
  const admin = await prisma.user.create({
    data: {
      login: "admin",
      nom: "Administrateur",
      password: "admin123",
      role: Role.ADMIN,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      login: "user1",
      nom: "Jean Dupont",
      password: "user123",
      role: Role.SIMPLE,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      login: "user2",
      nom: "Marie Martin",
      password: "user456",
      role: Role.SIMPLE,
    },
  });

  // Création des tâches avec images et audios
  const tache1 = await prisma.tache.create({
    data: {
      nom: "Faire les devoirs",
      description: "Terminer les exercices de maths",
      userId: admin.id,
      status: false,
      image: "1758806145262-image.JPG",
      audio: "1758806145265-audio.webm",
    },
  });

  const tache2 = await prisma.tache.create({
    data: {
      nom: "Réunion projet",
      description: "Préparer la présentation",
      userId: admin.id,
      status: true,
      image: "1758807880967-image.JPG",
    },
  });

  const tache3 = await prisma.tache.create({
    data: {
      nom: "Faire le ménage",
      description: "Nettoyer la maison",
      userId: user1.id,
      status: false,
      audio: "1758802011160-audio.webm",
    },
  });

  const tache4 = await prisma.tache.create({
    data: {
      nom: "Acheter des courses",
      description: "Liste de courses pour la semaine",
      userId: user2.id,
      status: false,
      image: "1758803979235-image.png",
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

  await prisma.permission.upsert({
    where: { userId_tacheId: { userId: admin.id, tacheId: tache4.id } },
    update: { droit: Droit.CREER },
    create: { userId: admin.id, tacheId: tache4.id, droit: Droit.CREER },
  });

  // Création d'historique pour simuler l'activité
  await prisma.historique.create({
    data: {
      action: "Création",
      tacheId: tache1.id,
      userId: admin.id,
      details: `Tâche "${tache1.nom}" créée`,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 jours avant
    },
  });

  await prisma.historique.create({
    data: {
      action: "Modification",
      tacheId: tache1.id,
      userId: admin.id,
      details: `Champs modifiés: {"description":"Terminer les exercices de maths et physique"}`,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 jours avant
    },
  });

  await prisma.historique.create({
    data: {
      action: "Création",
      tacheId: tache2.id,
      userId: admin.id,
      details: `Tâche "${tache2.nom}" créée`,
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 jours avant
    },
  });

  await prisma.historique.create({
    data: {
      action: "Changement de statut",
      tacheId: tache2.id,
      userId: admin.id,
      details: `Status changé à true`,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 jours avant
    },
  });

  await prisma.historique.create({
    data: {
      action: "Création",
      tacheId: tache3.id,
      userId: user1.id,
      details: `Tâche "${tache3.nom}" créée`,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 jours avant
    },
  });

  await prisma.historique.create({
    data: {
      action: "Création",
      tacheId: tache4.id,
      userId: user2.id,
      details: `Tâche "${tache4.nom}" créée`,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 jours avant
    },
  });

  console.log("Seed mis à jour avec succès !");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
