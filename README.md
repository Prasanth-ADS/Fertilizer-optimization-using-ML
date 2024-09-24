# Fertilizer-optimization-using-ML
Edith Fert Pro is a smart fertilizer recommendation system designed to help farmers optimize fertilizer usage using real-time data from IoT sensors. This repository contains the frontend of the application, built with React.js, providing an easy-to-use interface for monitoring soil conditions and receiving personalized fertilizer recommendations.
Edith Fert Pro - Frontend (React.js)

Edith Fert Pro is a smart fertilizer recommendation system designed to help farmers optimize fertilizer usage by leveraging real-time data from IoT sensors. This repository contains the **frontend** of the application, built using React.js, which provides farmers with an easy-to-use interface to monitor soil conditions and receive personalized fertilizer recommendations.

---

Key Features:

1. Real-Time Data Visualization :
   - Displays real-time sensor data, including soil moisture, pH levels, temperature, and NPK levels, on an intuitive dashboard.
   - Users can monitor the health of their soil and view historical data trends.

2. Fertilizer Recommendations:
   - Farmers can input crop-specific details and receive tailored fertilizer recommendations based on the latest sensor data and crop requirements.

3. User-Friendly Interface:
   - A clean and responsive UI built with React.js, designed to be accessible even for non-tech-savvy users.
   - Easy navigation between different sections, including sensor data, recommendations, and community resources.

4. Mobile-Responsive:
   - The app is designed to be fully responsive, ensuring a smooth experience on mobile, tablet, and desktop devices.

---

Technologies Used :
- React.js: Frontend framework for building the user interface.
- Axios: For handling API requests to the backend that fetch real-time data and recommendations.
- CSS/Styled Components: For styling and making the app responsive across different devices.
  
---

Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/edith-fert-pro-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd edith-fert-pro-frontend
   ```

3.Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. The app will now be running at `http://localhost:3000` and will automatically reload if you make any edits.

---

Backend Integration:
This repository only contains the frontend part of the project. The frontend interacts with a backend API (not included here) that processes IoT sensor data and provides fertilizer recommendations.

You can integrate the frontend with the backend API by configuring the API endpoints in the `src/services/api.js` file or wherever necessary within the codebase.

---

Contributing:
We welcome contributions! Feel free to fork this repository, make enhancements or bug fixes, and submit a pull request.

---

License:
This project is licensed under the MIT License – see the LICENSE file for more details.
