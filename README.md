# Frontend ReplyIA

Interface utilisateur de l'application ReplyIA, construite avec Next.js et React.

## 🚀 Technologies

- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Graphiques**: Recharts
- **Notifications**: React Hot Toast
- **WebSocket**: Socket.IO Client
- **Utilitaires**: Lucide React (icônes), clsx

## 📋 Prérequis

- Node.js >= 18
- npm ou yarn

## 🔧 Installation

```bash
# Installer les dépendances
npm install
```

## ⚙️ Configuration

Créez un fichier `.env.local` à la racine du dossier `frontend` avec les variables suivantes :

```env
# Backend API
BACKEND_URL="http://localhost:3000"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"

# Stripe (pour les prix des plans)
NEXT_PUBLIC_STRIPE_PRICE_PRO="price_..."
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS="price_..."
```

**Note** : Les variables préfixées par `NEXT_PUBLIC_` sont exposées au client et accessibles dans le navigateur.

## 🏃 Scripts disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement sur http://localhost:3001

# Production
npm run build        # Build de production
npm run start        # Lance le serveur de production

# Linting
npm run lint         # Vérifie le code avec ESLint
```

## 🏗️ Architecture

Le projet utilise l'App Router de Next.js avec une structure organisée :

```
src/
├── app/                    # Routes Next.js (App Router)
│   ├── (auth)/            # Routes publiques (authentification)
│   │   ├── authentication/
│   │   ├── reset-password/
│   │   └── change-email/
│   ├── (protected)/       # Routes protégées (layout avec sidebar)
│   │   ├── dashboard/     # Tableau de bord
│   │   ├── tickets/       # Liste et détail des tickets
│   │   ├── billing/       # Gestion des abonnements
│   │   ├── settings/      # Paramètres et préférences
│   │   └── profile/       # Profil utilisateur
│   └── api/               # API Routes (proxy vers le backend)
│       ├── auth/          # Authentification
│       ├── tickets/       # Tickets
│       ├── billing/       # Facturation
│       ├── gmail/         # Intégration Gmail
│       ├── preferences/   # Préférences utilisateur
│       └── dashboard/     # Statistiques
│
├── components/            # Composants React
│   ├── layout/           # Sidebar, Header
│   ├── modules/          # Composants métier par module
│   │   ├── auth/
│   │   ├── tickets/
│   │   ├── billing/
│   │   ├── dashboard/
│   │   └── settings/
│   └── ui/               # Composants UI réutilisables
│
├── hooks/                # Hooks React personnalisés
│   ├── useGmailStatus.tsx
│   ├── useNotifications.tsx
│   ├── useTicketUpdates.tsx
│   └── useUserPreferencies.tsx
│
├── services/             # Services de communication API
│   ├── auth.service.ts
│   ├── tickets.service.ts
│   ├── billing.service.ts
│   ├── gmail.service.ts
│   └── ...
│
├── lib/                  # Utilitaires et helpers
│   ├── api-client.ts     # Client API générique
│   ├── api-route-helper.ts
│   └── auth-utils.ts
│
├── types/                # Types TypeScript
│   ├── auth.type.ts
│   ├── tickets.type.ts
│   ├── billing.type.ts
│   └── ...
│
└── utils/                # Utilitaires
    ├── constants/        # Constantes de l'application
    ├── date.ts
    └── query.ts
```

## 🔐 Authentification

L'authentification utilise des cookies HTTP-only pour stocker les tokens :
- `access_token` : Token d'accès JWT
- `refresh_token` : Token de rafraîchissement

Les tokens sont automatiquement rafraîchis via un interceptor qui intercepte les réponses 401.

## 📡 WebSocket

Le frontend se connecte au backend via Socket.IO pour recevoir :
- Mises à jour de tickets en temps réel
- Notifications utilisateur
- Statut de synchronisation Gmail

## 🎨 Styling

Le projet utilise **Tailwind CSS** pour le styling. Les classes utilitaires sont utilisées directement dans les composants.

### Configuration Tailwind

Le fichier `tailwind.config.js` est configuré pour scanner :
- `./src/app/**/*.{js,ts,jsx,tsx}`
- `./src/components/**/*.{js,ts,jsx,tsx}`

## 📱 Pages principales

- **`/authentication`** : Page de connexion/inscription
- **`/dashboard`** : Tableau de bord avec statistiques
- **`/tickets`** : Liste des tickets avec filtres
- **`/tickets/[id]`** : Détail d'un ticket avec messages
- **`/billing`** : Gestion des abonnements Stripe
- **`/settings`** : Paramètres (Gmail, préférences)
- **`/profile`** : Profil utilisateur

## 🔄 API Routes

Next.js expose des API Routes qui servent de proxy vers le backend :
- Gestion automatique des cookies d'authentification
- Rafraîchissement automatique des tokens
- Gestion des erreurs centralisée

## 🧪 Développement

### Structure des composants

Les composants sont organisés par module métier dans `components/modules/` :
- Chaque module contient les composants spécifiques à cette fonctionnalité
- Les composants UI réutilisables sont dans `components/ui/`

### Hooks personnalisés

- `useGmailStatus` : Vérifie le statut de connexion Gmail
- `useNotifications` : Gère les notifications WebSocket
- `useTicketUpdates` : Écoute les mises à jour de tickets
- `useUserPreferencies` : Gère les préférences utilisateur

## 🚢 Déploiement

### Build de production

```bash
npm run build
```

### Variables d'environnement en production

Assurez-vous de configurer toutes les variables d'environnement nécessaires dans votre plateforme de déploiement (Vercel, Netlify, etc.).

### Déploiement sur Vercel

Le projet est optimisé pour Vercel :

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

## 📝 Notes importantes

- Les cookies sont configurés avec `secure: false` en développement et `secure: true` en production
- Les API Routes utilisent `cache: "no-store"` pour éviter la mise en cache des données sensibles
- Le frontend écoute sur le port **3001** par défaut (le backend sur 3000)
- Les routes protégées sont automatiquement redirigées vers `/authentication` si non authentifié

## 🔗 Intégrations

- **Backend NestJS** : Communication via API REST et WebSocket
- **Stripe** : Gestion des paiements et abonnements
- **Gmail** : Connexion via OAuth et synchronisation des emails

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Socket.IO Client Documentation](https://socket.io/docs/v4/client-api)
