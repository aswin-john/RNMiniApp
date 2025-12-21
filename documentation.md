# RNMiniApp - Project Documentation

## 1. Architecture
The application follows a modular and component-based architecture in React Native. The project structure is organized as follows:
- **`src/screens/`**: Contains the main screen components (Login, Dashboard, Posts).
- **`src/components/`**: Reusable UI components organized by feature (e.g., `posts/`, `dashboard/`, `common/`).
- **`src/context/`**: Manages global application state using the React Context API.
- **`src/services/`**: Handles API interactions and data fetching logic.
- **`src/utils/`**: Contains utility functions, constants, and theme definitions.

## 2. State Management
The project utilizes the **React Context API** for state management, specifically for:
- **Authentication State**: Managed in `AuthContext.jsx`, handling user login, logout, and session persistence.
- **Global Data**: Providing a centralized way to share data across components without prop drilling.

## 3. API Flow & Data Handling
- **Data Fetching**: Uses **Axios** to fetch posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts).
- **Local Caching**: Implements **AsyncStorage** to cache fetched data. When the device is offline (detected via `@react-native-community/netinfo`), the app automatically loads and displays the cached data with an "Offline" indicator.
- **UI Features**:
  - **Pagination**: Implemented to load data in chunks, improving performance.
  - **Pull-to-Refresh**: Allows users to manually refresh the list of posts.
  - **Error Handling**: Comprehensive error UI for API failures and no-internet scenarios.

## 4. Build & Deployment
- **Android**: Configured for signed release builds (APK and AAB) using a custom keystore.
- **Security**: Sensitive credentials (keystore passwords) are managed via global Gradle properties to ensure they are not committed to version control.

---
*This project was built as part of the Mobile App Developer Hiring Task.*
