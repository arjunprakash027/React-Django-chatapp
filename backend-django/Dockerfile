# Use a base image with Python installed
FROM python:3.9

# # Set the working directory inside the container
WORKDIR /app

# # Copy the requirements file to the container
COPY requirements.txt .

# # Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application code to the container
COPY . .

# # Specify the command to run when the container starts
RUN python manage.py makemigrations
RUN python manage.py migrate

CMD [ "python", "manage.py","runserver" ]