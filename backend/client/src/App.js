import './App.css'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { isAuthenticated } from './components/Helper/authentication'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <main>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route
              exact
              path='/dashboard'
              render={(props) =>
                isAuthenticated() ? (
                  <Dashboard {...props} />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
