import { ReactElement, useEffect, useState } from 'react';
import {
  AppConfig,
  AuthOptions,
  Connect,
  showConnect,
  UserData,
  UserSession
} from '@stacks/connect-react';

import { Home } from './pages/Home';
import WalletButton from './components/wallet-button';
import { AppContext, AppState, defaultState } from './common/context';
import { resolveSTXAddress } from './common/use-stx-address';
import { resolve } from 'path';

const appDetails = {
  name: 'DAO Town',
  icon: './web/favicon.ico'
};

function App(): ReactElement {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [state, setState] = useState<AppState>(defaultState());

  const appConfig = new AppConfig(
    ['store_write', 'publish_data'],
    document.location.href
  );
  // useEffect(() => {
  //   setState(prevState => ({ ...prevState, currentTxId: '', currentTxStatus: '' }));
  // }, [location.pathname]);
  const userSession = new UserSession({ appConfig });
  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      console.log('here');
      // setUserData(userSession.loadUserData());
    }
  }, []);
  const authOptions: AuthOptions = {
    redirectTo: '/',
    userSession,
    appDetails,
    onFinish: ({ userSession }) => {
      const userData = userSession.loadUserData();

      console.log(userData);
      console.log('onFinish');
      setState((prevState) => ({ ...prevState, userData }));
    }
  };

  const disconnectWallet = () => {
    if (userSession.isUserSignedIn()) {
      userSession.signUserOut('/');
    }
    setState(defaultState());
  };
  const connectWallet = () => {
    showConnect({
      appDetails,
      userSession,
      onFinish: () => window.location.reload()
    });
  };
  return (
    <Connect authOptions={authOptions}>
      <AppContext.Provider value={[state, setState]}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="mx-auto max-w-2xl px-4">
            <div className="border bg-background p-8">
              {userSession.isUserSignedIn() && (
                <Home />
              )}
            </div>
            <WalletButton
              userData={userData}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
            />
          </div>
        </div>
      </AppContext.Provider>
    </Connect>
  );
}

export default App;
