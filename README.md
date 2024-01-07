This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## File Structure

```md
├───.next
│   └───...
├───node_modules
│   └───...
|
├───public
|    next.svg
|    vercel.svg
|
└───src
|   └────app
|        │   favicon.ico
|        │   globals.css
|        │   layout.js
|        │   page.js
|        │   page.module.css
|        │   profile.module.css
|        │   signup.module.css
|        │
|        ├───components
|        │   │   Account.js
|        │   │   Explore.js
|        │   │   Homepage.js
|        │   │   MovieDetails.js
|        │   │   MovieDetailsModal.js
|        │   │   Nav.js
|        │   │   Results.js
|        │   │   Search.js
|        │   │   Tabs.js
|        │   │   Toast.js
|        │   │
|        │   ├───account
|        │   │       Profile.js
|        │   │       ProfileSidebar.js
|        │   │       UserList.js
|        │   │
|        │   └───explore
|        │           MovieDetailsDataBox.js
|        │           Sidebar.js
|        │
|        ├───styles
|        │    Explore.module.css
|        │    Homepage.module.css
|        │    MovieDetails.module.css
|        │    MovieDetailsModal.module.css
|        │    Nav.module.css
|        │    Results.module.css
|        │    Search.module.css
|        │    Tabs.module.css
|        │    Toast.module.css
|        │
|        ├───users
|        │   ├───login
|        │   │    page.js
|        │   │    page.module.css
|        │   │
|        │   ├───new
|        │   │    page.js
|        │   │
|        │   └───signup
|        │        page.js
|        │
|        └───utils
|             handleLogout.js
|             resultsProps.js
|             setAuthToken.js
|   .env
|   .eslintrc.json
|   .gitignore
|   jsconfig.json
|   next.config.js
|   notes.md
|   package-lock.json
|   package.json
└   README.md
```