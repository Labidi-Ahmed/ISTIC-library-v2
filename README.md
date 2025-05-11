# Local Development Environment Setup

## Client (Vite React)
To start the client server, follow these steps:

1. Navigate to the `client` directory:
```
cd client
```

2. Install the required dependencies:
```
npm install
```

3. Create a `.env` file with the following content:
```
VITE_API_URL=http://localhost:7000/api
```

4. Start the development server:
```
npm run dev
```

The client will be running at `http://localhost:3000`.

## Server (Node.js Express)
To start the server, follow these steps:

1. Navigate to the `server` directory:
```
cd server
```

2. Install the required dependencies:
```
npm install
```

3. Create a `.env` file in the server directory with the following content:
```
# Server configuration
PORT=7000
ENV="dev"
DATABASE_URL=file:./dev.db
NODE_ENV=dev
ORIGIN=http://localhost:3000
SERVER_URL=http://localhost:7000

# Groq API key (must support image recognition, ideally Llama 4)
GROQ=your_groq_api_key_here

# Auth configuration - replace with your values
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_SECRET_ID=your_google_secret_id_here

# Storage configuration - replace with your values
BUCKET_NAME=your_bucket_name_here
BUCKET_REGION=your_bucket_region_here

# AWS credentials - replace with your values
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
```

4. Generate the database client:
```
npm run db:generate
```

5. Run database migrations:
```
npm run db:migrate
```

6. Start the development server:
```
npm run dev
```

The server will be running at `http://localhost:7000`.

