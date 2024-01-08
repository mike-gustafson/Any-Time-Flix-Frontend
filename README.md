
# ANY-TIME-FLIX (A.T.F)

EVERYONE ENJOYS A GOOD FLIX. THIS QUESTION IS WHAT TO WATCH?

ANY-TIME-FLIX IS A SOLUTION TO THIS ISSUE ALLOWING YOU TO VIEW NEW AND OLD MOVIES. AS WELL AS BEING ABLE TO CREATE A WATCHLIST LIKED AND A PLAYLIST SO THE USER CAN BE ONLY A CLICK AWAY FROM ALL OF THE MOVIES THEY LOVE.


## Deployment

<<<<<<< HEAD
1. FORK and CLONE this repo
2. Run npm install from your terminal while inside of the project's directory.
3. Check make sure the backend sever is running. Use nodemon to start server. [backend](https://github.com/mike-gustafson/Any-Time-Flix/tree/main)
4. Once connected you should see the port # you are using 
5. Create a .env file inside your front-end repo
6. Inside .env file put NEXT_PUBLIC_SERVER_URL=http://localhost:8000 (assuming your running sever 8000)
7. Type npm run dev in terminal inside of the poject's directory to start sever.
8. Once server started you will see a localhost:3000 ( or whatever sever you are using)
9. Open web browser and type your localhost in you URL address to access app.
=======
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
>>>>>>> 23445e47ac4cf23cb116f91cb44e1b73e9367c49
