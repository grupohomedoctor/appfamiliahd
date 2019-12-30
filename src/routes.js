import Login from './pages/login';
import Home from './pages/home';
import OxygenRefill from './pages/oxygenRefill';
import ElectiveRemoval from './pages/electiveRemoval';
import Exams from './pages/Exams';
import Equipment from './pages/Equipment';
import Forgot from './pages/Forgot';
import RegisterUser from './pages/RegisterUser';
import Info from './pages/Info';
import SolicitationDetails from './pages/SolicitationDetails';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const Routes = (userLogged = null) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Login: {
          screen: Login,
        },
        Home: {
          screen: Home,
        },
        Equipment,
        Exams,
        OxygenRefill,
        ElectiveRemoval,
        Info,
        SolicitationDetails,
        Forgot,
        RegisterUser,
      },
      {
        initialRouteName: userLogged ? 'Home' : 'Login',
      },
    ),
  );

export default Routes;
