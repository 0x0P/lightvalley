DROP TABLE documents;
DROP OWNED BY lightvalley;
REVOKE CONNECT ON DATABASE lightvalley FROM public;
DROP USER lightvalley;
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'lightvalley';
DROP DATABASE lightvalley;
