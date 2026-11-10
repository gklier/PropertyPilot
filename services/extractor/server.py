"""POST /read with a PDF body -> the certificate as JSON.
GET /health.

Standard library HTTP server: one caller (the PropertyPilot app), one request at a time,
which is also what keeps OCR from taking every core on a small server."""
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

import extract

MAX_BYTES = 15 * 1024 * 1024


class Handler(BaseHTTPRequestHandler):
    def _send(self, status, body):
        payload = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("content-type", "application/json")
        self.send_header("content-length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        if self.path == "/health":
            return self._send(200, {"ok": True})
        self._send(404, {"error": "not found"})

    def do_POST(self):
        if self.path not in ("/read",):
            return self._send(404, {"error": "not found"})
        length = int(self.headers.get("content-length") or 0)
        if length <= 0 or length > MAX_BYTES:
            return self._send(413, {"error": "send a PDF of at most 15 MB"})
        data = self.rfile.read(length)
        if not data.startswith(b"%PDF"):
            return self._send(415, {"error": "that is not a PDF"})
        try:
            self._send(200, extract.read_pdf(data))
        except Exception as error:  # a damaged PDF must not take the service down
            self._send(422, {"error": f"the document could not be read: {error}"})

    def log_message(self, fmt, *args):
        pass  # vendor documents are not echoed into container logs


if __name__ == "__main__":
    HTTPServer(("0.0.0.0", int(os.environ.get("PORT", "8080"))), Handler).serve_forever()
