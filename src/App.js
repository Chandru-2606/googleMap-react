import './App.css';
import { useReducer, createContext, useContext } from 'react';
import {BrowserRouter as Router,
        Routes,
        Route } from 'react-router-dom';
import Login from './components/Login/login';
import Otp from './components/OTP/OTP';
import Signup from './components/Signup/signup';
import Dashboard from './components/dashboard/dashboard';
import AddCustomer from './components/addCustomer/addCustomer';
import Customer from './components/customerDashboard/customer';

import { Reducer, reducerState } from './components/useReducer/reducer';

export const userContext = createContext()
export const useUsers = () => useContext(userContext);
function App() {
  const [users,dispatch] = useReducer(Reducer,reducerState);

  
  return (
    <div className="App">
      <Router>
      <userContext.Provider value={{ users , dispatch }}>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path={`/otp`} element={<Otp />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          {/* <Route path={`/dashboard/:id/:customerLatitude:/customerLatitude`} element={<Dashboard />}></Route> */}
          {/* <Route path={`/dashboard/:id/:customerLatitude:/customerLatitude`} element={<Dashboard />}></Route> */}
          <Route path={`/dashboard/:id/:lat/:lng`} element={<Dashboard />} />
          <Route path='/customer' element={<Customer />}></Route>
          <Route path={`/addCustomer`} element={<AddCustomer />} ></Route>
        </Routes>
      </userContext.Provider>
      </Router>
    </div>
  );
}

export default App;
