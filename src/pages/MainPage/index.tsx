import { observer } from 'mobx-react-lite';
import ToastTop from './components/ToastTop';
import Header from './components/Header';
// import SearchMap from './components/SearchMap';
import Services from './components/Services';
import Dashboards from './components/Dashbords';
import Footer from './components/Footer';

import mainStore from './store';

function MainPage() {
  return (
    <>
      <ToastTop />
      <Header mainStore={mainStore} />
      <div>
        {/* <SearchMap mainStore={mainStore} /> */}
        <Dashboards />
        <Services />
        <Footer />
      </div>
    </>
  );
}
export default observer(MainPage);
