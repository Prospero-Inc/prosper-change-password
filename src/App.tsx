import { Route, Router, Switch } from 'wouter';
import { ResetPassword } from './pages/ResetPassword';
import { NotToken } from './pages/NotToken';
import { Successfully } from './pages/SuccessFully';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/reset-password/:token'>
          {({ token }) => <ResetPassword token={token} />}
        </Route>
        <Route path='/reset-password'>
          <NotToken />
        </Route>
        <Route path={'/reset-password-successfully'}>
          <Successfully />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
