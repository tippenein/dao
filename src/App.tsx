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

const appDetails = {
  name: 'DAO Town',
  icon: 'favicon.ico'
};

function App(): ReactElement {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const appConfig = new AppConfig(
    ['store_write', 'publish_data'],
    document.location.href
  );
  const userSession = new UserSession({ appConfig });
  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
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
    }
  };

  const disconnectWallet = () => {
    if (userSession.isUserSignedIn()) {
      userSession.signUserOut('/');
    }
  };
  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => window.location.reload(),
      userSession
    });
  };
  return (
    <Connect authOptions={authOptions}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto max-w-2xl px-4">
          <div className="border bg-background p-8">
            <Home />
          </div>
          <WalletButton
            userData={userData}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
          />
        </div>
      </div>
    </Connect>
  );
}

export default App;
