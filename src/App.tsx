import './App.css';
import LogIn from './components/LogIn';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Info from './components/Info';
import styled from 'styled-components';
const Styles = styled.div`
   padding: 1rem;
   text-align:center
`;

const App = () => {
  return (
    <Styles>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Info" element={<Info />} />
        </Routes>
      </Router>
    </Styles>
  )
};

export default App;   
