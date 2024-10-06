# Project Overview

This repository contains the codebase for a multi-tier application consisting of four main components: 

1. **Frontend**: A React-based web application.
2. **Backend**: A Node.js-based API server.
3. **App**: A mobile application.
4. **ePandit**: An AI chatbot application.

Each of these components is containerized using Docker, and this repository also contains a `docker-compose.yaml` file to orchestrate the services. Below is a breakdown of the folder structure and details for each component.

## Folder Structure

```bash
.
├── frontend/       # React application
│   ├── src/        # Source files for the React app
│   ├── public/     # Static files for the React app
│   ├── Dockerfile  # Docker configuration for the frontend
│   ├── .gitignore  # Ignore node_modules, build files, etc.
│   └── README.md   # Instructions specific to the frontend setup
├── backend/        # Node.js API server
│   ├── src/        # Source files for the API server
│   ├── Dockerfile  # Docker configuration for the backend
│   ├── .gitignore  # Ignore node_modules, logs, etc.
│   └── README.md   # Instructions specific to the backend setup
├── app/            # Mobile application
│   ├── src/        # Source files for the mobile app
│   ├── Dockerfile  # Docker configuration for the mobile app
│   ├── .gitignore  # Ignore build artifacts, logs, etc.
│   └── README.md   # Instructions specific to the mobile app setup
├── epandit/        # AI chatbot application
│   ├── src/        # Source files for the chatbot
│   ├── Dockerfile  # Docker configuration for the AI chatbot
│   ├── .gitignore  # Ignore models, logs, etc.
│   └── README.md   # Instructions specific to the chatbot setup
├── docker-compose.yaml  # Docker Compose configuration to orchestrate all services
└── README.md       # General instructions and project overview (this file)
