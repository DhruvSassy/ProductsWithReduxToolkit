import RoutesPath from './routes';
import { SnackbarProvider } from 'notistack';
import './App.css';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <RoutesPath />
    </SnackbarProvider>
  );
};

export default App;
