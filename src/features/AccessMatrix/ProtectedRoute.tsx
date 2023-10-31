import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import type { AccessMatrixKey } from './types';
import { accessMatrixStoreInstance } from './store';

type ProtectedRouteProps = {
  element: JSX.Element;
  matrixKey: AccessMatrixKey;
};

const ProtectedRoute = observer(({ element, matrixKey }: ProtectedRouteProps) => {
  const doesHaveAccess = accessMatrixStoreInstance.doesHaveAccess(matrixKey);
  return doesHaveAccess ? element : <Navigate to="/" />;
});

export default ProtectedRoute;
