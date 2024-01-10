
# ANY-TIME-FLIX (A.T.F)

Everyone enjoys a good flix. The question is, what to watch? Any-Time-Flix is a solution to this issue, allowing you to view both new and old movies. Additionally, you can create a watchlist, liked movies, and a playlist so the user can be just a click away from all the movies they love.

## Deployment

1. **Fork and Clone this repo:**
   ```bash
   git clone https://github.com/your-username/any-time-flix.git

2. **Install  Dependencies**
    ```bash
    npm install


## Deployment

1. FORK and CLONE this repo
2. Run npm install from your terminal while inside of the project's directory.
3. Check make sure the backend sever is running. Use nodemon to start server. [backend](https://github.com/mike-gustafson/Any-Time-Flix/tree/main)
4. Once connected you should see the port # you are using 
5. Create a .env file inside your front-end repo
6. Inside .env file put NEXT_PUBLIC_SERVER_URL=http://localhost:8000 (assuming your running sever 8000)
7. Type npm run dev in terminal inside of the poject's directory to start sever.
8. Once server started you will see a localhost:3000 ( or whatever sever you are using)
9. Open web browser and type your localhost in you URL address to access app.



## Component Tree
- Home(Page.js)
  - Explore(Explore.js)
    - Sidebar(Sidebar.js)
      - Popular(Results.js)
      - Top Rated(Results.js)
      - Now Playing(Results.js)
      - Upcoming(Results.js)
  - Account(Account.js)
    - Sidebar(ProfileSidbar.js)
      - Profile(Profile.js)
        - Logout(Profile.js)
          - Login(Login.js)
      - Watched List(Results.js)
      - Watched(Results.js)
      - Liked(Results.js)
      - Playlist(Results.js)
  - Homepage(Homepage.js)
    - Login(Login.js)
      - Account(Account.js)
    - Sign Up(Signup/Page.js)
      - New User(New/Page.js)


## Screenshots

# HomePage
![atf ](https://github.com/SEIRFX-822/mern-auth-frontend/assets/142261380/5463b1e1-3b1f-4f3f-a3eb-be55643ab5b1)


# Login Page
![atf2](https://github.com/SEIRFX-822/mern-auth-frontend/assets/142261380/65736fa3-c882-4b74-aa99-7ce24f60b552)

# Explore Page
![atf3](https://github.com/SEIRFX-822/mern-auth-frontend/assets/142261380/bea1214e-8b4b-4e88-a8ba-609d012118f8)

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
