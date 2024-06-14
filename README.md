# EIGEN Technical Test

## Algorithm

-   Algorithm test available in algorithm folder

## Backend Test Case

-   Please change directory to app folder
-   Just reminder, please create your own .env file inside app folder.
-   Inside .env file please create 2 variable such as `DATABASE_URL` and `PORT`
-   This app by default use MySQL as Database
-   Please change in `datasource db` => `provider` in `/app/prisma/schema.prisma` if your database is not MySQL
-   IMPORTANT, if you want to run test file please test it each file. one by one, DO NOT run all of them at a time.
-   ALSO, IF `unit.test.ts` resulting 1 error, PLEASE run the test again one more time. There is probability having difference `1 milisecond` in `borrowedAt` section.

### Thank you so much if you reading this until the end and follow the instruction above 🙏
