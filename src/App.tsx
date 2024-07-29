import { Redirect, Route, Router, Switch } from 'wouter';
import { ResetPassword } from './pages/ResetPassword';
import { NotToken } from './pages/NotToken';
import { Successfully } from './pages/SuccessFully';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/auth/reset-password/:token'>
          {({ token }) => <ResetPassword token={token} />}
        </Route>
        <Route path='/auth/reset-password'>
          <NotToken />
        </Route>
        <Route path={'/auth/reset-password-successfully'}>
          <Successfully />
        </Route>
        
        <Redirect to="/auth/reset-password" replace />
      </Switch>
    </Router>
  );
}

export default App;
