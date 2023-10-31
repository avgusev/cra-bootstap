import { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Spinner from '../../components/Spinner';
import { userStoreInstance } from './store';
import { accessMatrixStoreInstance } from '../AccessMatrix/store';

type AuthWrapperProps = {
  children: ReactElement;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  useEffect(() => {
    userStoreInstance.init();
  }, []);

  const { user } = userStoreInstance;
  const { fetchState } = accessMatrixStoreInstance;

  return user !== null && fetchState !== 'pending' ? (
    children
  ) : (
    <div className="position-absolute top-50 start-50 translate-middle">
      <Spinner size={48} className="text-primary" />
    </div>
  );
};

export default observer(AuthWrapper);
