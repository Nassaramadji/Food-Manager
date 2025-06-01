# Étape 1 : Build React
FROM node:20 AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Étape 2 : Backend Flask + servir le build React
FROM python:3.11-slim
WORKDIR /app

# Dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le backend
COPY Application ./Application

# Copier le build React dans le dossier static du backend
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Variables d'environnement Flask
ENV FLASK_APP=Application
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]