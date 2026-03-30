// script.js
let currentNetworks = [];

// Fake data
const demoNetworks = [
    { ssid: "HomeWiFi_5G", signal: -42, security: "WPA3", channel: 36 },
    { ssid: "NeighborNet", signal: -68, security: "WPA2", channel: 11 },
    { ssid: "Cafe_Guest", signal: -81, security: "Open", channel: 6 },
    { ssid: "Office_24G", signal: -55, security: "WPA2", channel: 1 },
    { ssid: "IoT-Devices", signal: -73, security: "WPA3", channel: 40 }
];

const networkInfo = {
    "IP Address": "192.168.1.137",
    "MAC Address": "A4:BB:6D:12:34:56",
    "Gateway": "192.168.1.1",
    "Subnet Mask": "255.255.255.0",
    "DNS Server": "8.8.8.8",
    "Connection Type": "5 GHz",
    "Device Name": "Your Device"
};

// Initialize
$(document).ready(function () {
    renderSignalBars();
    renderNetworkInfo();
    scanNetworks();
    console.log('%c📶 WiFi Test Master Web ready!', 'color:#00ff88;font-weight:bold');
});

function renderSignalBars() {
    const barsHTML = `
        <div class="bar" style="height:12px;"></div>
        <div class="bar" style="height:22px;"></div>
        <div class="bar" style="height:32px;"></div>
        <div class="bar" style="height:42px;"></div>
        <div class="bar" style="height:52px;animation-delay:0.3s"></div>
    `;
    $('#signal-bars').html(barsHTML);
}

function refreshDashboard() {
    // Simulate refresh
    const signals = [-45, -52, -38, -61];
    const randomSignal = signals[Math.floor(Math.random() * signals.length)];
    $('#signal-strength').text(randomSignal + ' dBm');
    $('#current-ssid').text('HomeWiFi_5G');
    
    // Fake speed refresh
    $('#fake-download').text(Math.floor(Math.random() * 80 + 100) + ' Mbps');
    $('#fake-upload').text(Math.floor(Math.random() * 30 + 30) + ' Mbps');
    $('#fake-ping').text(Math.floor(Math.random() * 15 + 8) + ' ms');
    
    renderSignalBars();
    
    const refreshBtn = document.querySelector('button[onclick="refreshDashboard()"]');
    const original = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '✅ REFRESHED!';
    setTimeout(() => { refreshBtn.innerHTML = original; }, 1500);
}

function startSpeedTest() {
    const btn = document.getElementById('speed-btn');
    const progressArea = document.getElementById('speed-progress');
    const resultArea = document.getElementById('speed-final');
    const status = document.getElementById('speed-status');
    
    btn.classList.add('d-none');
    progressArea.classList.remove('d-none');
    resultArea.classList.add('d-none');
    status.textContent = 'Testing your connection...';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 18;
        if (progress > 100) progress = 100;
        document.getElementById('progress-bar').style.width = progress + '%';
        
        if (progress < 40) document.getElementById('progress-text').textContent = 'Testing download...';
        else if (progress < 75) document.getElementById('progress-text').textContent = 'Testing upload...';
        else document.getElementById('progress-text').textContent = 'Measuring ping...';
        
        if (progress >= 100) {
            clearInterval(interval);
            finishSpeedTest();
        }
    }, 80);
}

function finishSpeedTest() {
    const download = Math.floor(Math.random() * 120 + 80);
    const upload = Math.floor(Math.random() * 45 + 25);
    
    document.getElementById('speed-progress').classList.add('d-none');
    document.getElementById('speed-final').classList.remove('d-none');
    
    document.getElementById('final-download').innerHTML = `${download} <small class="fs-6">Mbps</small>`;
    document.getElementById('final-upload').innerHTML = `${upload} <small class="fs-6">Mbps</small>`;
    
    document.getElementById('speed-status').innerHTML = `✅ Test Complete!<br><small class="text-success">Your WiFi is performing great</small>`;
    
    // Reset button
    setTimeout(() => {
        const btn = document.getElementById('speed-btn');
        btn.classList.remove('d-none');
        btn.innerHTML = '🚀 TEST AGAIN';
    }, 2800);
}

function scanNetworks() {
    const container = $('#networks-list');
    container.empty();
    
    currentNetworks = [...demoNetworks];
    // Shuffle a bit
    currentNetworks.sort(() => Math.random() - 0.5);
    
    currentNetworks.forEach(net => {
        const signalPercent = Math.max(0, Math.min(100, 120 + net.signal));
        const html = `
        <div class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <strong>${net.ssid}</strong>
                <small class="ms-3 text-muted">${net.security} • Ch ${net.channel}</small>
            </div>
            <div class="text-end">
                <span class="badge bg-success">${net.signal} dBm</span>
                <div class="progress mt-1" style="width:120px;height:6px;">
                    <div class="progress-bar" style="width:${signalPercent}%"></div>
                </div>
            </div>
        </div>`;
        container.append(html);
    });
}

function renderNetworkInfo() {
    let html = '';
    Object.keys(networkInfo).forEach(key => {
        html += `
        <tr>
            <td class="text-muted">${key}</td>
            <td class="fw-bold text-end">${networkInfo[key]}</td>
        </tr>`;
    });
    $('#network-info-table').html(html);
}
