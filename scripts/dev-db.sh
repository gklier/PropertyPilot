#!/usr/bin/env bash
# Local development PostgreSQL without Docker.
# Usage: scripts/dev-db.sh start|stop|status
# Development only: local connections are trusted and the password is a placeholder.
set -euo pipefail

PORT="${PP_PGPORT:-5433}"
DB=propertypilot
ROLE=propertypilot
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

find_bin() {
  if command -v pg_ctl >/dev/null 2>&1; then dirname "$(command -v pg_ctl)"; return; fi
  for d in /usr/lib/postgresql/*/bin /opt/homebrew/opt/postgresql@*/bin /usr/local/opt/postgresql@*/bin; do
    [ -x "$d/pg_ctl" ] && { echo "$d"; return; }
  done
  echo "PostgreSQL binaries not found. Install PostgreSQL 16 or use docker compose up -d db." >&2
  exit 1
}
BIN="$(find_bin)"

# PostgreSQL refuses to run as root. When root, run as the postgres OS user
# with a data directory that user can reach.
if [ "$(id -u)" = "0" ]; then
  RUN_AS="${PP_PGUSER:-postgres}"
  DATA="${PP_PGDATA:-/var/lib/propertypilot-dev/pg}"
  mkdir -p "$DATA" && chown -R "$RUN_AS" "$(dirname "$DATA")"
  run() { su "$RUN_AS" -s /bin/bash -c "$*"; }
else
  DATA="${PP_PGDATA:-$ROOT/.data/pg}"
  mkdir -p "$DATA"
  run() { bash -c "$*"; }
fi
SOCK="${PP_PGSOCK:-/tmp}"
URL="postgres://$ROLE:$ROLE@localhost:$PORT/$DB"

case "${1:-}" in
  start)
    if [ ! -f "$DATA/PG_VERSION" ]; then
      run "$BIN/initdb -D '$DATA' -U postgres -A trust --encoding=UTF8 >/dev/null"
    fi
    if ! run "$BIN/pg_ctl -D '$DATA' status >/dev/null 2>&1"; then
      run "$BIN/pg_ctl -D '$DATA' -o \"-p $PORT -k $SOCK -c listen_addresses=localhost\" -l '$DATA/server.log' -w start >/dev/null"
    fi
    run "psql -h $SOCK -p $PORT -U postgres -d postgres -tAc \"select 1 from pg_roles where rolname='$ROLE'\" | grep -q 1 || psql -h $SOCK -p $PORT -U postgres -d postgres -qc \"create role $ROLE login password '$ROLE'\""
    run "psql -h $SOCK -p $PORT -U postgres -d postgres -tAc \"select 1 from pg_database where datname='$DB'\" | grep -q 1 || psql -h $SOCK -p $PORT -U postgres -d postgres -qc \"create database $DB owner $ROLE\""
    echo "PostgreSQL is running on port $PORT"
    echo "DATABASE_URL=$URL"
    ;;
  stop)
    run "$BIN/pg_ctl -D '$DATA' -m fast stop >/dev/null" && echo "PostgreSQL stopped"
    ;;
  status)
    run "$BIN/pg_ctl -D '$DATA' status" || true
    ;;
  *)
    echo "Usage: $0 start|stop|status" >&2; exit 2 ;;
esac
