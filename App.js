import Register from "./screens/auth/register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/auth/Login";
import { AuthProvider } from "./context/authContext";
import Home from "./screens/Home";
import Rootnavigation from "./navigation";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Rootnavigation/>
    </NavigationContainer>
  );
}
