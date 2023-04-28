import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';

function App() {
  return (

    <BrowserRouter forceRefresh={true}>

      <div className="App">

      <ToastContainer position='top-center' />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/addContact" component={AddEdit}/>
        <Route path="/view/:id" component={View}/>
      </Switch>
      </div>


    </BrowserRouter>
    
  );
}

export default App;
