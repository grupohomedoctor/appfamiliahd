import React from 'react';
import { useSelector } from 'react-redux';

import Routes from './../../routes';
import { setNavigator } from './../../services/navigation';

export default function VerifyLogin() {
  let userLogged = useSelector(state => state.asyncStorage);

  // console.log(userLogged);

  const RoutesWithLoginVerification = Routes(!!userLogged.IDAdmission);

  return <RoutesWithLoginVerification ref={setNavigator} />;
}
