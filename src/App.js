import logo from './logo.svg';
import './App.css';
import Countries from './components/Countries';
import Loader from './components/Loader';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box  padding={"10px"} minH="100vh" className="App">
      <Countries/>
    </Box>
  );
}

export default App;
