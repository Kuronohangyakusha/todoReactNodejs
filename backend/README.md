# Todo Application API

Une API RESTful pour la gestion de tâches avec système d'authentification et gestion des permissions.

## 🚀 Fonctionnalités

- ✅ Gestion des tâches (CRUD)
- 👥 Authentification des utilisateurs
- 🔐 Gestion des rôles (ADMIN, SIMPLE)
- 📸 Upload d'images pour les tâches
- 🔒 Système de permissions (LIRE, MODIFIER, CREER)
- 🎯 Attribution de tâches aux utilisateurs

## 🛠 Technologies Utilisées

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JWT pour l'authentification
- Multer pour la gestion des fichiers
- Zod pour la validation
- CORS

## 📋 Prérequis

- Node.js (version recommandée : >= 16)
- MySQL
- npm ou yarn

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone [url-du-repo]
   cd todo
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   - Créer un fichier `.env` à la racine du projet
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/your_database"
   JWT_SECRET=votre_secret_jwt
   ```

4. **Configurer la base de données**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Lancer l'application**
   ```bash
   npm run dev
   ```

## 📚 Structure du Projet

```
src/
├── controllers/      # Logique de contrôle des routes
├── middleware/       # Middlewares (auth, permissions)
├── repositories/     # Couche d'accès aux données
├── routes/          # Définition des routes
├── services/        # Logique métier
├── utils/           # Utilitaires
└── validator/       # Validation des données
```

## 🔑 Modèles de Données

### User
- id (Int, auto-increment)
- login (String, unique)
- password (String, unique)
- role (Enum: ADMIN, SIMPLE)

### Tache (Task)
- id (Int, auto-increment)
- nom (String)
- description (String)
- status (Boolean)
- userId (Int)
- image (String, optional)

### Permission
- id (Int, auto-increment)
- droit (Enum: LIRE, MODIFIER, CREER)
- tacheId (Int)
- userId (Int)

## 🔒 Sécurité

- Authentification via JWT
- Hashage des mots de passe avec bcrypt
- Système de permissions granulaire
- Validation des données entrantes avec Zod

## 📝 API Endpoints

### Authentication
- POST /auth/login
- POST /auth/register

### Users
- GET /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id

### Tasks
- GET /taches
- POST /taches
- GET /taches/:id
- PUT /taches/:id
- DELETE /taches/:id

### Permissions
- POST /permissions
- GET /permissions/:taskId
- PUT /permissions/:id
- DELETE /permissions/:id

## 📜 License

ISC

---

Développé avec ❤️ pour la gestion de tâches efficace.
