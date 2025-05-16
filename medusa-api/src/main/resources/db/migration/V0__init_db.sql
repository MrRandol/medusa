
-- Create the sequence for media IDs
CREATE SEQUENCE IF NOT EXISTS media_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    NO MAXVALUE
    CACHE 1;

-- Create the media table with SERIAL type for id
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    storage_location VARCHAR(255) NOT NULL,
    imported_at TIMESTAMP NOT NULL,
    last_modified TIMESTAMP NOT NULL
);

-- Grant permissions to the application user
GRANT ALL PRIVILEGES ON TABLE media TO medusa_user;
GRANT USAGE, SELECT ON SEQUENCE media_id_seq TO medusa_user;