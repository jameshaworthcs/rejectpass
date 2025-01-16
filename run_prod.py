import subprocess
import sys
import os
import platform
from dotenv import load_dotenv

def build_frontend():
    os.chdir('frontend')
    # Build the frontend for production
    subprocess.run(['npm', 'run', 'build'], shell=True, check=True)
    os.chdir('..')

def run_server():
    port = os.getenv('PORT', '5000')
    
    # Use Gunicorn on Linux and Waitress on Windows
    if platform.system() == 'Windows':
        threads = os.getenv('WAITRESS_THREADS', '4')
        return subprocess.Popen([sys.executable, '-c',
                               'from waitress import serve; '
                               'from reject_secret.main import app; '
                               f'serve(app, host="0.0.0.0", port={port}, threads={threads})'])
    else:
        workers = os.getenv('GUNICORN_WORKERS', '4')
        return subprocess.Popen(['gunicorn',
                               '--workers', workers,
                               '--bind', f'0.0.0.0:{port}',
                               '--access-logfile', '-',
                               'reject_secret.main:app'])

def main():
    # Load environment variables
    load_dotenv()
    
    if not os.getenv('SECRET_KEY'):
        print("Error: SECRET_KEY not set in environment variables")
        sys.exit(1)
        
    print("Starting Reject Secret Sharer in production mode...")
    
    port = os.getenv('PORT', '5000')
    
    # Build frontend
    print("Building frontend...")
    build_frontend()
    
    # Start server
    print("Starting server...")
    server = run_server()
    
    print("\nReject Secret Sharer is running in production mode!")
    print(f"Server: http://localhost:{port}")
    print("\nPress Ctrl+C to stop the server.")
    
    try:
        server.wait()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        server.terminate()
        server.wait()
        print("Server stopped.")

if __name__ == '__main__':
    main() 