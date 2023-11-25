import logo from './logo.svg';
import './App.css';
import Countries from './components/Countries';
import Loader from './components/Loader';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box   h="100vh" className="App">
      <Countries/>
    </Box>
  );
}

export default App;
