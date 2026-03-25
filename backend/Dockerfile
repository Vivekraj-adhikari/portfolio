FROM python:3.11-slim

# set working directory
WORKDIR /app

# copy files
COPY . .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# expose port
EXPOSE 10000

# run app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "10000"]