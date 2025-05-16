#!/bin/sh

# Debug: Print all environment variables
echo "Environment variables:"
env

# Debug: Print specific variable
echo "VITE_API_URL value: $VITE_API_URL"

# Generate config.js with debug info
echo "window.APP_CONFIG = { API_URL: '$VITE_API_URL' };" > /usr/share/nginx/html/config.js

# Debug: Show generated config
echo "Generated config.js content:"
cat /usr/share/nginx/html/config.js

# Start nginx
exec nginx -g 'daemon off;' 