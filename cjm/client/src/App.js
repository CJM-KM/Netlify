import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import Navigation from './components/Navigation';

// Pages
import Home from './pages/Home';
import JourneyList from './pages/JourneyList';
import JourneyDetail from './pages/JourneyDetail';
import CreateJourney from './pages/CreateJourney';

const theme = createTheme({
  palette: {
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
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journeys" element={<JourneyList />} />
          <Route path="/journeys/:id" element={<JourneyDetail />} />
          <Route path="/create-journey" element={<CreateJourney />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 