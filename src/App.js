import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ListPage from './Pages/ListPage';
import CartPage from './Pages/CartPage';
// import BkppAGE from './Pages/BkppAGE.js';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (


    <>
      <Router>
        <Switch>
          <Route path="/" exact component={ListPage} />
          <Route path="/listpage" exact component={ListPage} />
          <Route path="/cart" component={CartPage} />
          {/* <Route path="/bkp" component={BkppAGE} /> */}
        </Switch>
      </Router>
    </>



  );
}

export default App;
