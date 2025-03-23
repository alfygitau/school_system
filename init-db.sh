#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE users_db;
  CREATE DATABASE courses_db;
  CREATE DATABASE profile_db;
EOSQL
