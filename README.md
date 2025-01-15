# Reject Secret Sharer

A secure, self-destructing secret sharing application. Share passwords and sensitive information with a link that automatically expires after being viewed.

## Features

- Share secrets securely with self-destructing links
- Automatic expiration after viewing
- Modern, responsive UI with dark mode support
- Easy to run and deploy

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- Redis server running locally

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rejectpass
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. Make sure Redis is running locally on the default port (6379)

5. Run the application:
   ```bash
   python run.py
   ```

The application will start both the frontend and backend servers and open your default browser to http://localhost:5173.

## Development

- Frontend runs on http://localhost:5173
- Backend API runs on http://localhost:5000
- Redis should be running on localhost:6379

## Environment Variables

The following environment variables can be set to customize the application:

- `REDIS_HOST`: Redis host (default: localhost)
- `REDIS_PORT`: Redis port (default: 6379)
- `REDIS_PREFIX`: Key prefix for Redis storage (default: reject)
- `FLASK_DEBUG`: Enable debug mode (default: 0)
- `SECRET_KEY`: Flask secret key
- `NO_SSL`: Disable SSL (default: False)

## License

MIT License 