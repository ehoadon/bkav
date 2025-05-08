
Project Hub & Admin Dashboard
Welcome to Project Hub, a web-based platform that consolidates a suite of productivity tools and utilities designed to streamline workflows for developers, accountants, and project managers. From encryption tools to project management and invoice generation, this project offers a centralized interface to access various features, powered by Firebase for secure authentication and real-time data storage.
🚀 Features

Encryption/Decryption Tool: Supports JSON, XML, and BEPOS formats with AES and Base64 encoding.
DateTime & Ticks Converter: Quickly convert between .NET ticks and DateTime formats.
Accounting Software List: Manage, search, and add accounting software entries.
XML File Merger: Combine multiple XML files into a single file.
Random Password Generator: Create secure passwords for system accounts.
XML/JSON Value Filter: Search and analyze ticked variables in XML/JSON data.
Task Statistics: Track and report task progress with monthly statistics and advanced search.
Project Statistics: Manage, edit, and search large-scale customer projects.
Notes Manager: Create, complete, and delete notes with JSON import/export support.
Invoice Generator: Generate XML-based invoices with a user-friendly interface.
Admin Dashboard (Demo): Visualize data and generate reports (in development).
Firebase Integration: Secure user authentication and real-time data storage with Firebase Realtime Database.

🛠️ Installation
Prerequisites

Node.js (optional, for local development with a server).
A modern web browser (Chrome, Firefox, Edge, etc.).
A Firebase project for authentication and database.

Setup

Clone the Repository:
git clone https://github.com/ehoadon/bkav.git
cd bkav


Configure Firebase:

Create a Firebase project in the Firebase Console.
Enable Email/Password authentication in the "Authentication" section.
Create a Realtime Database and note the database URL.
Copy your Firebase configuration from "Project settings" > "General" > "Your apps".
Update the firebaseConfig in auth.js or relevant files (e.g., document.html) with your Firebase credentials. Example:const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};




Set Firebase Rules:

In the Firebase Console, go to "Realtime Database" > "Rules" and apply the following rules to secure user-specific data:{
    "rules": {
        "projects": {
            "$uid": {
                ".read": "auth != null && auth.uid == $uid",
                ".write": "auth != null && auth.uid == $uid"
            }
        },
        "users": {
            "$uid": {
                ".read": "auth != null && auth.uid == $uid",
                ".write": "auth != null && auth.uid == $uid"
            }
        }
    }
}




Run Locally:

Use a local server (recommended) to avoid CORS issues:npx http-server


Or open index.html directly in a browser (note: some Firebase features may require a server).
Access the app at http://localhost:8080 (or the port provided by your server).



📖 Usage

Access the Platform:

Open the app in your browser.
Log in or sign up using an email and password via the authentication overlay.
Forgot your password? Use the "Forgot Password" link to reset it.


Navigate Tools:

The homepage (index.html) displays a grid of available tools, each with a brief description and a link to access.
Click on a tool's "Details" link to use it (e.g., document.html for Project Statistics, sheet.html for Accounting Software List).


Manage Projects:

Tools like Project Statistics and Notes Manager allow you to add, edit, search, and delete entries.
Import/export JSON data for bulk operations (supported in Notes Manager and Project Statistics).


Admin Dashboard:

Access the demo dashboard from the homepage (currently in development).
View sample statistics and reports powered by Chart.js.



📂 Project Structure
docs/
├── index.html           # Homepage with tool grid and auth overlay
├── auth.js             # Firebase authentication logic
├── document.html       # Project Statistics tool
├── sheet.html          # Accounting Software List tool
├── Note.html           # Notes Manager tool
├── En-Comp.V3.html     # Encryption/Decryption tool
├── datetimetoticks_V2.html # DateTime & Ticks Converter
├── GopFileXML.html     # XML File Merger
├── randompass.html     # Random Password Generator
├── CheckID.html        # XML/JSON Value Filter
├── TyLeXuLy.html       # Task Statistics
├── CreateInvoice_UpdateV2.html # Invoice Generator
├── images/             # Tool card images
└── README.md           # Project documentation

🔧 Technologies

Frontend: HTML, CSS, JavaScript
Backend: Firebase (Authentication, Realtime Database)
Libraries:
Firebase SDK v11.6.0 (compat)
Chart.js (for Admin Dashboard)


Styling: Custom CSS with responsive grid layout

🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

Please ensure your code follows the project's coding style and includes appropriate documentation.
📬 Contact
For questions, suggestions, or feedback, reach out to:

GitHub: ehoadon
Email: thanghdb@bkav.com

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

Built with 💻 by ThangHDb © 2025
