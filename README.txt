How to get started

Install NodeJS.

Install Postgres http://www.enterprisedb.com/products-services-training/pgdownload#windows (do not install in D:/Program Files or somewhere else where you have restricted user privileges)
Create a folder for your database somewhere on your system (where you have normal write permissions, for instance in your documents).

Navigate to the installation folder
C:\Program Files\Postgres\9.5\bin
and run initdb.exe ./data (if you chose the default data folder path, otherwise just enter the path to your data folder instead of ./data)
The equivalent to pwd in Windows is: echo %cd%

Now you can run the database by typing:
"pg_ctl" -D "<datafolderpath>" -l logfile start

Star pgAdmin III and change the database name to paranoia-smil

Create user:
createuser.exe -s postgres

Install Nodemon:
npm install nodemon -g

We use Nodemon for running our node application because it restarts the server on file changes

Set IntelliJ to run the latest js: http://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/


Running

navigate to your project root
nodemon ./bin/www localhost 3000