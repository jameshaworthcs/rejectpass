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
   python run_prod.py
   ```

The application will start both the frontend and backend servers. In your browser, go to http://localhost:5000.

## Development

- RejectPass runs on http://localhost:5000
- Frontend proxies to the backend API on http://localhost:5000/api/...
- Redis should be running on localhost:6379

## Environment Variables

The following environment variables can be set to customize the application:

- `REDIS_HOST`: Redis host (default: localhost)
- `REDIS_PORT`: Redis port (default: 6379)
- `REDIS_PREFIX`: Key prefix for Redis storage (default: reject)
- `FLASK_DEBUG`: Enable debug mode (default: 0)
- `SECRET_KEY`: Flask secret key (Change this to a random string)
- `NO_SSL`: Disable SSL (default: False)
- `PORT`: The port to run the server on (default: 5000)

## License

MIT License 