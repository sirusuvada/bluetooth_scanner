async function scanBluetooth() {
    try {
        console.log("Requesting Bluetooth Device...");
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true, // Allow any device
            optionalServices: ['battery_service']  // Modify based on your need
        });

        console.log("Device found:", device.name || "Unknown device");
        let deviceList = document.getElementById("deviceList");
        let listItem = document.createElement("li");
        listItem.textContent = device.name || "Unknown Device";
        deviceList.appendChild(listItem);

    } catch (error) {
        console.log("Bluetooth scan failed:", error);
        alert("Error: " + error.message);
    }
}
