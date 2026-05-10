"""Lokaler Dev-Server mit No-Cache-Headers.

Python http.server cached CSS/JS/Modules aggressiv im Browser.
Während der Entwicklung wollen wir bei jedem Reload frische Files.
Dieser Wrapper setzt die richtigen Header und ist sonst identisch
zu `python -m http.server 8123`.

Aufruf: python _devserver.py
"""
import http.server
import socketserver

PORT = 8123


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        print(f"Dev-Server (No-Cache) auf http://localhost:{PORT} — Strg+C zum Stoppen")
        httpd.serve_forever()
