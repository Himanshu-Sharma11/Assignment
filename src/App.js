import { Route, Switch } from 'react-router';
import Header from './components/Dashboard/Header/Header';

import Login from './components/Dashboard/Login';
import Adduser from './components/Dashboard/Adduser';
import ManageUser from './components/Dashboard/ManageUser';

function App() {
  return (
    <div>
      <Switch>
        <Header>
          <Route exact path='/' component={Login} />
          <Route exact path='/add_User' component={Adduser} />
          <Route exact path='/manage_User' component={ManageUser} />
        </Header>
      </Switch>
    </div>
  );
}

export default App;
