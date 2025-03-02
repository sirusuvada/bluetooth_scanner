from flask import Flask, render_template, jsonify
import asyncio
from bleak import BleakScanner

app = Flask(__name__)

def scan_bluetooth():
    devices = asyncio.run(BleakScanner.discover(timeout=3))  # Run async code in sync function
    return [{"name": d.name or "Unknown", "address": d.address} for d in devices]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/scan")
def scan():
    devices = scan_bluetooth()  # Call sync function
    return jsonify(devices)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)

