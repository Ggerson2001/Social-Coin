FROM python:3.9-slim-buster

# Install dependencies
RUN apt-get update \
    && apt-get install -y libpq-dev gcc

# Set the working directory to /app
WORKDIR /SOCIAL-COIN-DJANGO/Django

# Copy the requirements file
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Expose port 8000
EXPOSE 8000

# Run the Django application when the container starts
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]