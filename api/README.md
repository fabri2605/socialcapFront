# Mina zkApp: Offchain Storage

This template uses TypeScript.

## How to build

```sh
npm run build
```

## How to run tests

Node: **Node 19.x** from `nvm use stable`

Install: [Getting Started w/ Typescript](https://www.fastify.io/docs/latest/Reference/TypeScript/)

Commands:

- `npm run start`: run server
- `npm run build`: build only
- `npx prisma migrate dev`: migrate Db and recreate PrismaClient

## Connection po Postgres using node-postgres

If you are in Ubuntu, then go to the following folder.

~~~
/etc/postgresql/{your_pg_version}/main
~~~

Open the file `pg_hba.conf` to write with SuperUser/Administrative permission,

Go to the bottom, and put `trust` at the end of following lines.
~~~
# Database administrative login by Unix domain socket
local   all             postgres                                trust

# "local" is for Unix domain socket connections only
local   all             all                                     trust

# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
~~~

After that, restart your PostgreSQL server and try again with your code.
~~~
sudo systemctl restart postgresql
~~~

Otherwise we get connection errors.
