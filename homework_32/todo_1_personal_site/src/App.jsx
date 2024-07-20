import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import TodoList from './components/TodoList';
import SwapiPage from './components/SwapiPage';

function App() {
  return (
      <Router>
        <CssBaseline />
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/todo" component={TodoList} />
            <Route path="/swapi" component={SwapiPage} />
          </Switch>
        </Container>
        <Footer />
      </Router>
  );
}

export default App;