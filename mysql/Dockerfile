# Use the official MySQL image
FROM mysql:latest

# Set environment variables (you can also use .env files)
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=newdb
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Expose MySQL port
EXPOSE 3306

# Default command to run MySQL
CMD ["mysqld"]
