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
import { createStackNavigator } from 'react-navigation-stack';

const stackNavigatorHome = createStackNavigator(
  {
    Home,
    Equipment,
    Exams,
    OxygenRefill,
    ElectiveRemoval,
    Info,
    SolicitationDetails,
  },
  {
    headerMode: 'none',
  },
);

const stackNavigatorLogin = createStackNavigator(
  {
    Login,
    Forgot,
    RegisterUser,
    Info,
  },
  {
    headerMode: 'none',
  },
);

const Routes = (userLogged = null) =>
  createAppContainer(
    createSwitchNavigator(
      {
        LoginRoute: stackNavigatorLogin,
        HomeRoute: stackNavigatorHome,
      },
      {
        initialRouteName: userLogged ? 'HomeRoute' : 'LoginRoute',
      },
    ),
  );

export default Routes;
