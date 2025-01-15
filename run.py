import subprocess
import sys
import os
import webbrowser
from time import sleep

def run_frontend():
    os.chdir('frontend')
    return subprocess.Popen(['npm', 'run', 'dev'], shell=True)

def run_backend():
    return subprocess.Popen([sys.executable, 'reject_secret/main.py'], 
                          env={**os.environ, 'FLASK_DEBUG': '1'})

def main():
    print("Starting Reject Secret Sharer...")
    
    # Start backend
    print("Starting backend server...")
    backend = run_backend()
    
    # Start frontend
    print("Starting frontend server...")
    frontend = run_frontend()
    
    # Wait a moment for servers to start
    sleep(2)
    
    # Open browser
    webbrowser.open('http://localhost:5173')
    
    print("\nReject Secret Sharer is running!")
    print("Frontend: http://localhost:5173")
    print("Backend: http://localhost:5000")
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