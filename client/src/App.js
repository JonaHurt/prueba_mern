import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import { Routes } from './routes/Routes';
import { UsuarioProvider } from './context/UsuarioContext';

function App() {
  return (
    <div className="App">
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    </div>
  );
}

export default App;
