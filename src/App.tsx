import { ReactElement, useEffect } from 'react';
import {
  AppConfig,
  AuthOptions,
  Connect,
  UserSession
} from '@stacks/connect-react';

import { Home } from './pages/Home';

function App(): ReactElement {
  const appConfig = new AppConfig(
    ['store_write', 'publish_data'],
    document.location.href
  );
  const userSession = new UserSession({ appConfig });
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      // const userData = userSession.loadUserData();

      const getData = async () => {
        try {
          console.log('getting stuff');
        } catch (error) {
          console.error(error);
        }
      };
      void getData();
    } else {
      console.log('in else clause');
    }
  }, []);
  const authOptions: AuthOptions = {
    redirectTo: '/',
    userSession,
    onFinish: ({ userSession }) => {
      const userData = userSession.loadUserData();
      console.log(userData);
      console.log('onFinish');
    },
    appDetails: {
      name: 'DAO',
      icon: 'favicon.ico'
    }
  };

  return (
    <Connect authOptions={authOptions}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-lg border bg-background p-8">
            <Home />
          </div>
        </div>
      </div>
    </Connect>
  );
}

export default App;
