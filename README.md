
# ANY-TIME-FLIX (A.T.F)

EVERYONE ENJOYS A GOOD FLIX. THIS QUESTION IS WHAT TO WATCH?

ANY-TIME-FLIX IS A SOLUTION TO THIS ISSUE ALLOWING YOU TO VIEW NEW AND OLD MOVIES. AS WELL AS BEING ABLE TO CREATE A WATCHLIST LIKED AND A PLAYLIST SO THE USER CAN BE ONLY A CLICK AWAY FROM ALL OF THE MOVIES THEY LOVE.


## Deployment

1. FORK and CLONE this repo
2. Run npm install from your terminal while inside of the project's directory.
3. Check make sure the backend sever is running. Use nodemon to start server. [backend](https://github.com/mike-gustafson/Any-Time-Flix/tree/main
4. Once connected you should see the port # you are using 
5. Create a .env file inside your front-end repo
6. Inside .env file put NEXT_PUBLIC_SERVER_URL=http://localhost:8000 (assuming your running sever 8000)
7. Type npm run dev in terminal inside of the poject's directory to start sever.
8. Once server started you will see a localhost:3000 ( or whatever sever you are using)
9. Open web browser and type your localhost in you URL address to access app.



## tree
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


# # Screenshots
HomePage
![atf ](https://github.com/SEIRFX-822/mern-auth-frontend/assets/142261380/5463b1e1-3b1f-4f3f-a3eb-be55643ab5b1)