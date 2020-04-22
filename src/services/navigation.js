import { NavigationActions } from 'react-navigation';

let navigator;

export function setNavigator(ref) {
  // seta o valor da "navigator" com o valor que recebe
  navigator = ref;
}

export function navigate(routeName, params) {
  // chama o dispatch para fazer a navegação para outra tela
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
