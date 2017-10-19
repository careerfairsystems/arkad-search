# arkad-search
A system handling information about Arkad and, like Google Search, gives a prioritised response when queried.

Setting upp development environment locally:
```
https://github.com/careerfairsystems/arkad-search.git
cd arkad-search
npm install
```

## Setting up Postgres DB locally
Install HomeBrew (for mac)
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Install postgreSQL
```
brew install postgresql
```
Then, issue the following commands:
```
createdb arkad-search
createuser <username>
psql arkad-search < create_table.sql
export PSQL_USER="<desired_database_username>"
export PSQL_PW=""
```

For the next instruction you need to [calculate a bcrypted](https://www.dailycred.com/article/bcrypt-calculator) password with <b>4 rounds</b>.

Next, issue the following commands.
```
psql arkad-search
insert into users values(true, '<arkad_search_username>', '<4-round-bcrypted-password>');
\q
```