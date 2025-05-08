// import { GoogleOAuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/app_routes";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="958001035029-iavdm8ra5lkpnr623mppt4o9sp6spi5j.apps.googleusercontent.com">
      <AppRoutes />
    </GoogleOAuthProvider>
  );
}

export default App;
