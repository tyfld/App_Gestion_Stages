import { UserProvider } from './context/UserContext';
import Router from './Router'; // Ton fichier de routes (exemple)

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
