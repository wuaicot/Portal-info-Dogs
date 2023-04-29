import {Home, Landing, Detail, Form, About} from './views'; 
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { useLocation  } from 'react-router-dom';
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar/>}
            <Route exact path= '/' component={Landing}></Route>
            <Route exact path= '/dogs/:id' component={Detail}></Route>
            <Route exact path= '/create' component={Form}></Route>
            <Route path= '/home' render={()=> <Home/>}></Route>
            <Route path='/about' component={About}></Route>
      
    </div>
  );
}

export default App;
