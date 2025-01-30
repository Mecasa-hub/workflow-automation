import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import WorkflowBuilder from './components/WorkflowBuilder';
import PreMadeWorkflows from './components/PreMadeWorkflows';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<WorkflowBuilder />} />
            <Route path="/templates" element={<PreMadeWorkflows />} />
            <Route path="/builder" element={<WorkflowBuilder />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
