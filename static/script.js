let connectedDevice = null;
let ledCharacteristic = null;

async function scanBluetooth() {
    try {
        console.log("Requesting Bluetooth Device...");
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,  // Allow any device
            optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb'] // Service UUID for custom LED control
        });

        console.log("Device found:", device.name || "Unknown Device");
        let deviceList = document.getElementById("deviceList");
        let listItem = document.createElement("li");
        listItem.textContent = device.name || "Unknown Device";
        deviceList.appendChild(listItem);

        // Connect to the device
        await connectToDevice(device);

    } catch (error) {
        console.log("Bluetooth scan failed:", error);
        alert("Error: " + error.message);
    }
}

async function connectToDevice(device) {
    try {
        console.log("Connecting to device...");
        const server = await device.gatt.connect();

        console.log("Connected. Getting services...");
        const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb'); // Custom Service UUID

        console.log("Getting LED characteristic...");
        ledCharacteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb'); // Characteristic UUID

        connectedDevice = device;
        document.getElementById("ledOnBtn").disabled = false; // Enable LED button
        console.log("Connected and ready to send commands.");

    } catch (error) {
        console.log("Connection failed:", error);
        alert("Error: " + error.message);
    }
}

async function turnOnLED() {
    if (!ledCharacteristic) {
        alert("Not connected to a device!");
        return;
    }

    try {
        console.log("Sending command to turn on LED...");
        let command = new Uint8Array([1]); // Sending '1' to turn on LED
        await ledCharacteristic.writeValue(command);
        console.log("LED Turned On!");

    } catch (error) {
        console.log("Failed to send command:", error);
        alert("Error: " + error.message);
    }
}
