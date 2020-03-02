import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/NavTab";
import Profile from './components/pages/profile';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Footer from './components/footer'

function App() { 
    return (
        <Router>
            <div>
                <NavTabs />
                <Route exact path="/" component={About} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/contact" component={Contact} />
                <Footer />
            </div>
        </Router>
    )
}

export default App;