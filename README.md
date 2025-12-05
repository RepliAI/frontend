This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Arborescence

src/
 ├─ app/
 │   ├─ (auth)/
 │   │   └─ login/
 │   │       └─ page.tsx
 │   │
 │   ├─ (protected)/
 │   │   ├─ layout.tsx         
 │   │   ├─ dashboard/
 │   │   │   └─ page.tsx
 │   │   ├─ tickets/
 │   │   │   ├─ page.tsx
 │   │   │   └─ [id]/
 │   │   │       └─ page.tsx
 │   │   ├─ billing/
 │   │   │   ├─ page.tsx
 │   │   │   └─ success/
 │   │   │       └─ page.tsx
 │   │   │   └─ cancel/
 │   │   │       └─ page.tsx
 │   │   ├─ settings/
 │   │   │   └─ page.tsx
 │   │   └─ profile/
 │   │       └─ page.tsx (plus tard)
 │   │
 │   ├─ api/                   
 │   └─ globals.css
 │
 ├─ components/
 │   ├─ layout/
 │   │   ├─ Sidebar.tsx
 │   │   └─ PageHeader.tsx
 │   │
 │   ├─ ui/
 │   │   ├─ Badge.tsx
 │   │   ├─ Button.tsx
 │   │   ├─ Card.tsx
 │   │   ├─ Input.tsx
 │   │   ├─ Textarea.tsx
 │   │   ├─ Select.tsx
 │   │   └─ ErrorModal.tsx (ou dans ui/)
 │   │
 │   ├─ modules/
 │   │   ├─ dashboard/
 │   │   │   ├─ GmailAlertBanner.tsx
 │   │   │   ├─ StatCard.tsx
 │   │   │   ├─ StatusPieChart.tsx
 │   │   │   ├─ TicketTrendChart.tsx
 │   │   │   └─ PeriodSelector.tsx
 │   │   │
 │   │   ├─ tickets/
 │   │   │   ├─ TicketFilters.tsx
 │   │   │   ├─ TicketList.tsx
 │   │   │   ├─ TicketCard.tsx
 │   │   │   ├─ StatusBadge.tsx
 │   │   │   ├─ MessageTimeline.tsx
 │   │   │   ├─ MessageItem.tsx
 │   │   │   ├─ TicketStatusActions.tsx
 │   │   │   └─ Actions.tsx
 │   │   │
 │   │   ├─ billing/
 │   │   │   ├─ BillingPlans.tsx
 │   │   │   └─ (éventuels composants additionnels)
 │   │   │
 │   │   ├─ settings/
 │   │   │   ├─ GmailConnectCard.tsx
 │   │   │   └─ PreferencesCard.tsx
 │   │   │
 │   │   └─ auth/
 │   │       └─ LoginHero.tsx (si tu veux isoler la partie visuelle)
 │   │
 │   └─ ...
 │
 ├─ hooks/
 │   ├─ useGmailStatus.ts
 │   ├─ useUserPreferences.ts
 │   └─ useSidebar.ts
 │
 ├─ services/
 │   ├─ api/
 │   │   ├─ ticket.service.ts
 │   │   ├─ billing.service.ts
 │   │   ├─ preferences.service.ts
 │   │   └─ gmail.service.ts
 │   ├─ http/
 │   │   └─ api-client.ts
 │   └─ domain/
 │       ├─ ticket.types.ts
 │       ├─ billing.types.ts
 │       └─ user.types.ts
 │
 ├─ lib/
 │   ├─ date.ts
 │   ├─ format.ts
 │   └─ constants.ts
 │
 └─ config/
     └─ app.config.ts
