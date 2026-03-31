# ShelfLife Frontend

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Routing**: React Router
- **Notifications**: React Toastify
- **Custom Hooks**: shelflife-react-hooks
- **Containerization**: Docker & Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**
- **Npm**
- **Git**
- **Docker** and **Docker Compose** (optional, for containerized setup)

### Verify Installation

```bash
node --version    # Should be v18+
npm --version     # Should be v9+
```

## Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the root directory (copy from `template.env`):

```bash
cp template.env .env
```

Edit `.env` and set your backend URL:

```env
VITE_BACKEND_BASE_URL=http://localhost:8080
```

**Note**: If your backend is running on a different host/port, update the URL accordingly.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (TypeScript checking + Vite build) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |


## Docker Setup

### Build Docker Image

```bash
docker build -t shelflife-frontend:latest \
  --build-arg VITE_BACKEND_BASE_URL=http://localhost:8080 .
```

### Run with Docker

```bash
docker run -p 5173:5173 shelflife-frontend:latest
```

### Using Docker Compose

The easiest way to run the frontend service:

```bash
docker-compose up
```

This will:
1. Build the Docker image
2. Start the frontend service on port 5173
3. Restart automatically if the container exits

**docker-compose.yaml** Configuration:
- Uses Node.js Alpine image for smaller image size
- Runs on port 5173
- Auto-restarts on failure
- Backend URL: http://localhost:8080

### Stop Docker Services

```bash
docker-compose down
```

## Contributing

1. Fork the Repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to check code quality
5. Run `npm run build` to verify production build
6. Commit and push
7. Create a pull request