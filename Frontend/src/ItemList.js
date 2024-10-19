/*let items = [
  { 
    id: 1, 
    name: "Dell G16", 
    url: "/dellnobg.png",
    Bigimage:"/delllaptop2.jpg",
    quantity: 0, 
    price: 50000, 
    category:"laptop",
    description: "Dell G16 High performance Gaming laptop",
    specifications: {
      brand: "Dell",
      model: "G16 5520",
      processor: "Intel Core i7-12700H",
      graphics: "NVIDIA GeForce RTX 3060",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: "16-inch, 2560x1600, 165Hz",
      weight: "2.56 kg",
      battery: "86Whr",
      ports: "3x USB-A, 1x HDMI, 1x Thunderbolt 4, 1x Audio jack",
      os: "Windows 11 Home"
    }
  },
  { 
    id: 2, 
    name: "IPhone 16 PRO Max", 
    url: "/phone1.jpeg", 
    Bigimage:"/phone2.jpeg",
    quantity: 0, 
    category:"phone",
    price: 250000, 
    description: "Iphone 16 Pro Max 256GB Storage",
    specifications: {
      brand: "Apple",
      model: "iPhone 16 Pro Max",
      display: "6.7-inch Super Retina XDR, 120Hz",
      processor: "A18 Bionic chip",
      ram: "8GB",
      storage: "256GB",
      camera: "Triple 48MP Ultra Wide, Telephoto, and Wide",
      battery: "4500 mAh",
      os: "iOS 17",
      dimensions: "160.8 x 78.1 x 7.7 mm",
      weight: "228g"
    }
  },
  { 
    id: 3, 
    name: "Headphones", 
    url: "/headphonenobg.png", 
    Bigimage:"/headphone2.jpg",
    quantity: 0, 
    category:"accessory,music",
    price: 3000, 
    description: "Noise-cancelling headphones",
    specifications: {
      brand: "Sony",
      model: "WH-1000XM4",
      connectivity: "Bluetooth 5.0",
      batteryLife: "30 hours",
      weight: "254g",
      color: "Black",
      features: ["Active Noise Cancellation", "Touch controls", "Alexa & Google Assistant support"]
    }
  },
  { 
    id: 4, 
    name: "Smartwatch", 
    url: "/smartwatchnobg.png", 
    Bigimage:"/smartwatch2.jpg",
    quantity: 0, 
    category:"accessory",
    price: 7000, 
    description: "Feature-rich smartwatch",
    specifications: {
      brand: "Samsung",
      model: "Galaxy Watch 4",
      display: "1.4-inch Super AMOLED",
      batteryLife: "Up to 40 hours",
      weight: "30g",
      connectivity: "Bluetooth, Wi-Fi, GPS",
      features: ["Heart Rate Monitor", "Sleep Tracking", "Fitness Tracking", "Voice Assistant"]
    }
  },
  { 
    id: 5, 
    name: "Keyboard", 
    url: "/keyboardnobg.png", 
    Bigimage:"/keyboard2.jpg",
    category:"accessory",
    quantity: 0, 
    price: 1500, 
    description: "Mechanical keyboard with RGB lighting",
    specifications: {
      brand: "Logitech",
      model: "G Pro X",
      switchType: "GX Blue Clicky",
      backlight: "RGB per-key lighting",
      connectivity: "Wired USB",
      features: ["Programmable Macros", "Detachable cable", "Compact design"]
    }
  },
  { 
    id: 6, 
    name: "Mouse", 
    url: "/mouse.jpg", 
    Bigimage:"/mouse2.jpg",
    category:"accessory",
    quantity: 0, 
    price: 1000, 
    description: "Wireless ergonomic mouse",
    specifications: {
      brand: "Logitech",
      model: "MX Master 3",
      dpi: "4000",
      connectivity: "Bluetooth & 2.4GHz wireless",
      battery: "Rechargeable Li-Po (up to 70 days)",
      weight: "141g",
      features: ["Ergonomic design", "Customizable buttons", "USB-C charging"]
    }
  },
  { 
    id: 7, 
    name: "Curve LCD", 
    url: "/curvelcd.jpeg", 
    Bigimage:"/curvelcd2.jpeg",
    category:"tv",
    quantity: 0, 
    price: 15000, 
    description: "24-inch Full HD monitor",
    specifications: {
      brand: "Samsung",
      model: "CF390",
      resolution: "1920x1080",
      refreshRate: "60Hz",
      panelType: "VA",
      curvature: "1800R",
      ports: "HDMI, VGA, Audio Out",
      features: ["Eye Saver Mode", "Game Mode"]
    }
  },
  { 
    id: 8, 
    name: "Printer", 
    url: "/printer.jpg", 
    Bigimage:"/printer.jpg",
    quantity: 0, 
    category:"accessory",
    price: 8000, 
    description: "All-in-one inkjet printer",
    specifications: {
      brand: "HP",
      model: "DeskJet 4155e",
      type: "All-in-One",
      connectivity: "Wi-Fi, USB",
      features: ["Print, Scan, Copy", "Mobile Printing", "Auto Document Feeder"]
    }
  },
  { 
    id: 9, 
    name: "Apple IPAD PRO", 
    url: "/ipad.jpeg", 
    Bigimage:"/ipad2.jpeg",
    category:"laptop",
    quantity: 0, 
    price: 120000, 
    description: "Apple Ipad Pro Latest 10 GEN A18 Bionic Chip",
    specifications: {
      brand: "Apple",
      model: "iPad Pro 10th Gen",
      display: "11-inch Liquid Retina, 120Hz",
      processor: "A18 Bionic Chip",
      ram: "8GB",
      storage: "128GB",
      battery: "28.65Wh",
      os: "iPadOS 17",
      dimensions: "247.6 x 178.5 x 5.9 mm",
      weight: "468g"
    }
  },
  { 
    id: 10, 
    name: "Camera", 
    url: "/camera.jpg", 
    Bigimage:"/camera2.jpg",
    category:"photo",
    quantity: 0, 
    price: 45000, 
    description: "DSLR camera with 18-55mm lens",
    specifications: {
      brand: "Canon",
      model: "EOS 1500D",
      sensor: "APS-C CMOS Sensor",
      megapixels: "24.1MP",
      lens: "18-55mm",
      video: "Full HD",
      iso: "100-6400",
      weight: "475g",
      battery: "Rechargeable Li-Ion"
    }
  },
  { 
    id: 11, 
    name: "Power Bank", 
    url: "/powerbank.jpg", 
    Bigimage:"/powerbank.jpg",
    quantity: 0, 
    category:"accessory",
    price: 1500, 
    description: "10000mAh portable power bank",
    specifications: {
      brand: "Mi",
      capacity: "10000mAh",
      output: "18W Fast Charging",
      ports: "2x USB-A, 1x USB-C",
      weight: "251g",
      color: "Black",
      features: ["Dual Output", "LED Indicators", "Low Power Mode"]
    }
  },
  { 
    id: 12, 
    name: "Charger", 
    url: "/charger.jpg", 
    Bigimage:"/charger.jpg",
    category:"accessory",
    quantity: 0, 
    price: 800, 
    description: "Fast charging adapter",
    specifications: {
      brand: "Samsung",
      type: "25W Super Fast Charger",
      output: "USB-C PD",
      weight: "50g",
      color: "White",
      cable: "1m USB-C to USB-C",
      features: ["Overvoltage Protection", "Compact Design"]
    }
  },
  {
    id: 13,
    name: "Speakers",
    url: "/speaker.jpeg",
    Bigimage:"/speaker.jpeg",
    quantity: 0,
    price: 5000,
    description: "Bluetooth stereo speakers",
    specifications: {
      brand: "JBL",
      model: "Flip 6",
      connectivity: "Bluetooth 5.1",
      batteryLife: "Up to 12 hours",
      waterproof: "IP67",
      weight: "550g",
      dimensions: "17.8 x 6.8 x 7.2 cm",
      features: ["Deep Bass", "Stereo Sound", "PartyBoost Feature"]
    }
  },
  {
    id: 14,
    name: "Webcam",
    url: "/webcam.jpg",
    Bigimage:"/webcam2.jpg",
    quantity: 0,
    price: 2000,
    description: "HD 1080p USB webcam",
    specifications: {
      brand: "Logitech",
      model: "C920",
      resolution: "1080p at 30fps",
      lens: "Glass",
      fieldOfView: "78°",
      connectivity: "USB 2.0",
      weight: "162g",
      features: ["Autofocus", "Dual Microphones", "Clip-on Design"]
    }
  },
  {
    id: 15,
    name: "Router",
    url: "/router.jpg",
    Bigimage:"/router.jpg",
    quantity: 0,
    price: 3000,
    description: "Dual-band Wi-Fi router",
    specifications: {
      brand: "TP-Link",
      model: "Archer C6",
      frequency: "2.4GHz & 5GHz",
      speed: "Up to 1200 Mbps",
      connectivity: "4x LAN, 1x WAN, 1x USB",
      features: ["MU-MIMO Technology", "Guest Network", "Parental Controls"]
    }
  },
  {
    id: 16,
    name: "Microphone",
    url: "/mic.jpg",
    Bigimage:"/mic.jpg",
    quantity: 0,
    price: 3500,
    description: "Studio-quality USB microphone",
    specifications: {
      brand: "Blue",
      model: "Yeti",
      type: "Condenser Microphone",
      connectivity: "USB",
      weight: "550g",
      polarPatterns: ["Cardioid", "Bidirectional", "Omnidirectional", "Stereo"],
      features: ["Gain Control", "Mute Button", "Adjustable Stand"]
    }
  },
  {
    id: 17,
    name: "Projector",
    url: "/projector.jpg",
    Bigimage:"/projector.jpg",
    quantity: 0,
    price: 25000,
    description: "Mini LED projector",
    specifications: {
      brand: "ViewSonic",
      model: "M1 Mini",
      resolution: "854x480",
      brightness: "120 Lumens",
      connectivity: "HDMI, USB",
      weight: "300g",
      batteryLife: "2.5 hours",
      features: ["Compact Design", "Built-in Speaker", "Swappable Top Plates"]
    }
  },
  {
    id: 18,
    name: "VR Headset",
    url: "/vr.jpg",
    Bigimage:"/vr2.jpg",
    quantity: 0,
    price: 15000,
    description: "Virtual reality headset",
    specifications: {
      brand: "Oculus",
      model: "Quest 2",
      display: "1832 x 1920 per eye",
      refreshRate: "90Hz",
      storage: "64GB",
      weight: "503g",
      connectivity: "Wi-Fi, Bluetooth",
      features: ["6DoF Tracking", "Standalone VR", "Touch Controllers"]
    }
  },
  {
    id: 19,
    name: "Smart Light",
    url: "/light.jpg",
    Bigimage:"/light.jpg",
    quantity: 0,
    price: 1200,
    description: "Smart LED bulb with Wi-Fi control",
    specifications: {
      brand: "Philips",
      model: "Hue White & Color Ambiance",
      power: "9.5W",
      lumens: "800",
      connectivity: "Wi-Fi, Zigbee",
      weight: "72g",
      color: "16 Million Colors",
      features: ["Voice Control", "Dimmable", "Remote Access"]
    }
  },
  {
    id: 20,
    name: "Smart Plug",
    url: "/plug.png",
    Bigimage:"/plug.png",
    quantity: 0,
    price: 1500,
    description: "Wi-Fi enabled smart plug",
    specifications: {
      brand: "Amazon",
      model: "Smart Plug",
      compatibility: "Alexa",
      power: "10A Max",
      connectivity: "Wi-Fi",
      weight: "79g",
      features: ["Voice Control", "Remote On/Off", "Energy Monitoring"]
    }
  },
  {
    id: 21,
    name: "Fitness Tracker",
    url: "/fitness.jpg",
    Bigimage:"/fitness.jpg",
    quantity: 0,
    price: 3000,
    description: "Activity tracker with heart rate monitor",
    specifications: {
      brand: "Fitbit",
      model: "Inspire 2",
      display: "OLED",
      batteryLife: "10 days",
      weight: "30g",
      waterResistance: "50m",
      features: ["Heart Rate Monitor", "Sleep Tracking", "Calorie Counter"]
    }
  },
  {
    id: 22,
    name: "External Hard Drive",
    url: "/externalharddrive.jpg",
    Bigimage:"/externalharddrive.jpg",
    quantity: 0,
    price: 5000,
    description: "1TB external hard drive",
    specifications: {
      brand: "WD",
      model: "My Passport",
      capacity: "1TB",
      connectivity: "USB 3.0",
      weight: "170g",
      encryption: "256-bit AES",
      features: ["Backup Software", "Password Protection", "Portable Design"]
    }
  },
  {
    id: 23,
    name: "Washing Machine",
    url: "/wash.jpg",
    Bigimage:"/wash.jpg",
    quantity: 0,
    price: 21000,
    description: "Smart Washing Machine High Capacity",
    specifications: {
      brand: "LG",
      model: "T7281NDDLG",
      capacity: "6.2 kg",
      type: "Top Load",
      power: "360W",
      features: ["Smart Inverter", "Turbo Drum", "Waterfall Circulation"]
    }
  },
  {
    id: 24,
    name: "PR LED TV",
    url: "/cpu.png",
    Bigimage:"/cpu.jpg",
    category:"tv",
    quantity: 0,
    price: 21800,
    description: "Smart LED TV HD Display 4K",
    specifications: {
      brand: "Sony",
      model: "Bravia X75",
      screenSize: "43-inch",
      resolution: "4K UHD",
      connectivity: "3x HDMI, 2x USB",
      weight: "9 kg",
      features: ["HDR Support", "Google Assistant", "X-Reality Pro"]
    }
  },
  {
    id: 25,
    name: "QLED Monitor",
    url: "/qled2.jpg",
    Bigimage: "/qled.jpg",
    quantity: 0,
    price: 35000,
    category:"tv",
    description: "32-inch Ultra HD 4K QLED Monitor with HDR10",
    specifications: {
      brand: "Samsung",
      displayType: "QLED",
      resolution: "3840 x 2160 (4K)",
      refreshRate: "144Hz",
      connectivity: "HDMI, DisplayPort, USB-C",
      features: ["HDR10 Support", "Eye Saver Mode", "Flicker-Free Technology", "Height Adjustable Stand", "Built-in Speakers"]
    }
  }
  ,
  {
    id: 26,
    name: "Gaming Chair",
    url: "/chair.jpeg",
    Bigimage:"/chair.jpeg",
    quantity: 0,
    price: 12000,
    description: "Ergonomic gaming chair with lumbar support",
    specifications: {
      brand: "Secretlab",
      model: "Omega 2020",
      material: "PU Leather",
      adjustability: "4D Armrests, Multi-Tilt Mechanism",
      weightCapacity: "130 kg",
      weight: "25 kg",
      dimensions: "70 x 83 x 127 cm",
      features: ["Memory Foam Headrest", "Lumbar Pillow", "Recline 165°"]
    }
  },
  {
    id: 27,
    name: "Desk Lamp",
    url: "/lam.jpg",
    Bigimage:"/lam.jpg",
    quantity: 0,
    price: 2000,
    description: "Smart desk lamp with dimmable LEDs",
    specifications: {
      brand: "Mi",
      model: "Smart LED Desk Lamp 1S",
      power: "10W",
      colorTemperature: "2700K - 6500K",
      weight: "800g",
      dimensions: "44.5 x 14 x 44 cm",
      features: ["Wi-Fi Control", "Voice Assistant Support", "Adjustable Brightness"]
    }
  },*/
/*
  {
    id: 29,
    name: "Asus Vivobook",
    url: "/asus.jpeg",
    Bigimage:"/asus.jpeg",
    quantity: 0,
    category:"laptop",
    price: 83500,
    description: "Asus Vivobook OLED Intel i7 13th Gen",
    specifications: {
      brand: "Asus",
      model: "Vivobook S15",
      display: "15.6-inch OLED, 2880 x 1620",
      processor: "Intel Core i7-13700H",
      RAM: "16GB DDR4",
      storage: "512GB SSD",
      weight: "1.8 kg",
      batteryLife: "8 hours",
      features: ["Thunderbolt 4", "Wi-Fi 6", "ErgoLift Hinge", "Harman Kardon Audio"]
    }
  },
  {
    id: 30,
    name: "Air Purifier",
    url: "/air.jpg",
    Bigimage:"/air.jpg",
    quantity: 0,
    price: 10000,
    description: "HEPA air purifier for home",
    specifications: {
      brand: "Dyson",
      model: "Pure Cool TP04",
      filtration: "HEPA and Activated Carbon",
      coverageArea: "600 sq. ft.",
      weight: "4.98 kg",
      power: "56W",
      features: ["Air Quality Monitoring", "360° Air Intake", "Oscillation"]
    }
  },
  {
    id: 31,
    name: "Samsung S24 ULTRA",
    url: "/s24.jpg",
    Bigimage:"/s24.jpg",
    category:"phone",
    quantity: 0,
    price: 127000,
    description: "Samsung S24 ULTRA 16GB RAM 1TB Storage",
    specifications: {
      brand: "Samsung",
      model: "Galaxy S24 Ultra",
      display: "6.8-inch QHD+ Dynamic AMOLED 2X",
      processor: "Exynos 2200",
      RAM: "16GB",
      storage: "1TB",
      camera: "108MP + 10MP + 12MP + 10MP",
      battery: "5000mAh",
      features: ["120Hz Refresh Rate", "S Pen Support", "5G Connectivity", "IP68 Water Resistance"]
    }
  },
  {
    id: 32,
    name: "Mi 11 lite NE 5G",
    url: "/mi11.jpg",
    Bigimage:"/mi11.jpg",
    quantity: 0,
    category:"phone",
    price: 25000,
    description: "Slim Mi 11 LITE 5G 8GB RAM 512GB Storage",
    specifications: {
      brand: "Xiaomi",
      model: "Mi 11 Lite NE 5G",
      display: "6.55-inch FHD+ AMOLED",
      processor: "Snapdragon 778G",
      RAM: "8GB",
      storage: "512GB",
      camera: "64MP + 8MP + 5MP",
      battery: "4250mAh",
      weight: "158g",
      features: ["33W Fast Charging", "Dual Speakers", "Slim Design (6.8mm)"]
    }
  },
  {
    id: 33,
    name: "Game Controller",
    url: "/gamecontroller.jpg",
    Bigimage:"/gamecontroller.jpg",
    quantity: 0,
    price: 3000,
    description: "Low-latency High-Speed Game Controller",
    specifications: {
      brand: "Logitech",
      model: "F310",
      connectivity: "USB Wired",
      weight: "200g",
      compatibility: ["PC", "Mac"],
      features: ["Dual Vibration Motors", "Customizable Buttons", "D-Pad for Precision"]
    }
  },
  {
    id: 34,
    name: "Smart OLED",
    url: "/oled.jpg",
    Bigimage:"/oled4.jpg",
    quantity: 0,
    category:"tv",
    price: 56000,
    description: "Smart OLED 36-inch HD Display",
    specifications: {
      brand: "LG",
      model: "CX Series",
      screenSize: "36-inch",
      resolution: "4K UHD",
      refreshRate: "120Hz",
      weight: "12.8 kg",
      connectivity: ["4x HDMI 2.1", "3x USB"],
      features: ["Dolby Vision IQ", "NVIDIA G-SYNC", "AI Picture Pro"]
    }
  },{
    id: 36,
    name: "Sony PlayStation 5",
    url: "/ps5.png",
    Bigimage:"/ps52.jpg",
    quantity: 0,
    price: 55000,
    description: "Sony PlayStation 5 Gaming Console with Ultra-HD Blu-ray",
    specifications: {
      brand: "Sony",
      model: "PlayStation 5",
      processor: "AMD Ryzen Zen 2 (8 Cores, 16 Threads)",
      GPU: "Custom AMD RDNA 2",
      RAM: "16GB GDDR6",
      storage: "825GB SSD",
      weight: "4.5 kg",
      connectivity: ["Wi-Fi 6", "Bluetooth 5.1", "2x USB-A", "1x USB-C"],
      dimensions: "390 x 104 x 260 mm",
      features: ["Ray Tracing", "4K Gaming", "Tempest 3D AudioTech", "Backwards Compatibility"]
    }
  }
 
    
];*/

import { response } from "express";

/*let product = {
  id: 28,
  name: "Airpod",
  url: "/airpod.jpg",
  Bigimage: "/airpod.jpg",
  quantity: 0,
  price: 15500,
  description: "Apple Airpod Noise Cancellation With Comfort",
  specifications: {
    brand: "Apple",
    model: "AirPods Pro 2",
    type: "In-Ear",
    batteryLife: "4.5 hours (single charge)",
    weight: "56.4g (with case)",
    noiseCancellation: "Active Noise Cancellation (ANC)",
    features: ["Spatial Audio", "Sweat and Water Resistance", "Adaptive EQ"]
  }
};


fetch("http://localhost:7600/addProduct", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify(product),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));*/


  




//export default product;





