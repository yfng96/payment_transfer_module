## 🛠️ Setup Instructions

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
  ```bash
  npm install -g expo-cli
  ```
- Android Studio (for emulator support)

> ⚠️ This project has **not been tested on iOS**.

---

### 🚀 Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/chia5484/payment-transfer-module.git
cd payment-transfer-module
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start the development server

```bash
npm run android
```

---

## 📆 Tech Stack

- **React Native** with [Expo](https://expo.dev/)
- **Redux** for state management
- **MirageJS** for mocking backend APIs (balance & transactions)
- **Tailwind CSS** for styling
## 🧠 Design Decisions

**Biometric & PIN Fallback**  
Implemented biometric authentication (Face ID / Fingerprint) using `expo-local-authentication`. To ensure accessibility across all devices, a fallback modal was provided for entering a 6-digit PIN. This allows users without biometric support to still securely access the application.

**Axios Interceptors**  
Global error handling was implemented through Axios interceptors. This ensures consistent user feedback for various scenarios including network connection errors and unauthorized requests. By centralizing error responses, we reduce code duplication and improve maintainability.

**Redux Toolkit**  
Redux Toolkit is used for managing the app's global state, including authentication, wallet balance, and transaction history. `createAsyncThunk` is utilized for structured and reliable API calls, offering clear loading, success, and failure states.

**MirageJS Mock Server**  
A MirageJS server is integrated to simulate API responses during development. This enables thorough UI testing, including offline and error states, without the need for a live backend. It's especially useful for mocking authentication flows, balance fetching, and transaction records.

## 🧰 Challenges Faced

**UI Design & Time Management**  
Designing the UI took more time than expected due to uncertainty in layout and flow. Extra effort went into refining the user experience, which initially slowed development

**Demo Video**  
https://drive.google.com/drive/folders/1VpIXWKhGb74UUJr412l44pSqoJVctAf6?usp=sharing
