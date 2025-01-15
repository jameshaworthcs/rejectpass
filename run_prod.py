import subprocess
import sys
import os
from dotenv import load_dotenv

def run_frontend():
    os.chdir('frontend')
    # Build the frontend for production
    subprocess.run(['npm', 'run', 'build'], shell=True, check=True)
    # Serve the built files using a production-ready server
    frontend_port = os.getenv('FRONTEND_PORT', '4173')
    return subprocess.Popen(['npm', 'run', 'preview', '--', '--port', frontend_port], shell=True)

def run_backend():
    backend_port = os.getenv('BACKEND_PORT', '5000')
    return subprocess.Popen([sys.executable, 'reject_secret/main.py'],
                          env={**os.environ, 
                               'FLASK_ENV': 'production',
                               'FLASK_DEBUG': '0',
                               'PORT': backend_port})

def main():
    # Load environment variables
    load_dotenv()
    
    if not os.getenv('SECRET_KEY'):
        print("Error: SECRET_KEY not set in environment variables")
        sys.exit(1)
        
    print("Starting Reject Secret Sharer in production mode...")
    
    frontend_port = os.getenv('FRONTEND_PORT', '4173')
    backend_port = os.getenv('BACKEND_PORT', '5000')
    
    # Start backend
    print("Starting backend server...")
    backend = run_backend()
    
    # Build and serve frontend
    print("Building and serving frontend...")
    frontend = run_frontend()
    
    print("\nReject Secret Sharer is running in production mode!")
    print(f"Frontend: http://localhost:{frontend_port}")
    print(f"Backend: http://localhost:{backend_port}")
    print("\nPress Ctrl+C to stop both servers.")
    
    try:
        # Wait for either process to finish
        frontend.wait()
        backend.wait()
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        frontend.terminate()
        backend.terminate()
        frontend.wait()
        backend.wait()
        print("Servers stopped.")

if __name__ == '__main__':
    main() 