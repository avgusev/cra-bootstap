import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useMatch,
  Outlet,
  useParams,
  useNavigate,
} from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/bs.scss';
import './styles/bs_skdf.scss';

import SkdfDesign from './SkdfDesign';
import Desktop from './pages/Desktop';
import FramePage from './pages/FramePage';
import RoadsOnBalancePage from './pages/RoadsOnBalancePage';
import RoadsPage from './pages/RoadsPage';
import RoadPage from './pages/RoadPage';
import MainPage from './pages/MainPage';
import AccidentsPage from './pages/AccidentsPage';
import AccidentPage from './pages/AccidentPage';
import BridgesPage from './pages/BridgesPage';
import AccountPage from './pages/AccountPage';
import NotificationsPage from './pages/NotificationsPage';
import BridgePage from './pages/BridgePage';

import ToastifyContainer from './components/ToastifyContainer';
import Sidebar from './features/Sidebar';
import CallbackPage from './features/Auth/CallbackPage';
import ProtectedRoute from './features/AccessMatrix/ProtectedRoute';
import AuthWrapper from './features/Auth/AuthWrapper';
import { MapContainer } from 'skdf-gis-component';

import sidebarClasses from './features/Sidebar/Sidebar.module.scss';
import NewsletterPage from './pages/NewsletterPage';
import RoadDiagnosticsPage from './pages/RoadDiagnosticsPage';
import BackboneNetworkPage from './pages/BackboneNetworkPage';
import { userStoreInstance } from './features/Auth/store';

import Events from './events';

function PseudoElement() {
  const location = useLocation();
  const match = useMatch(location.pathname);
  const params = useParams();

  console.log(match);
  console.log(params);

  return <pre>{JSON.stringify({ location, match }, null, 2)}</pre>;
}

const userAuth = {
  id_token:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3QjZEMEMwNzBCN0I0Q0M0MzMyMzcyNjk3Nzk4NkI3MTYxNDQ2N0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJKN2JRd0hDM3RNeERNamNtbDNtR3R4WVVSbjQifQ.eyJuYmYiOjE2NzA5NDc2ODYsImV4cCI6MTY3MDk1MTI4NiwiaXNzIjoiaHR0cHM6Ly9pczQtc3BlY2lhbGlzdC5kZXYxLnNrZGYubG9jYWwiLCJhdWQiOiJza2RmIiwiaWF0IjoxNjcwOTQ3Njg2LCJhdF9oYXNoIjoiTDVoZXRBZS14UEk4RzRnemgySFJfQSIsInNfaGFzaCI6Ik1zS3BVcDREbl9PdmJsRk1LTkhSQkEiLCJzaWQiOiIwYTYzdkp6Si1VTVBVZy1XdzE3c0dBIiwic3ViIjoiZC5kZXZlbG9wZXIiLCJhdXRoX3RpbWUiOjE2NzA5NDc2ODQsImlkcCI6ImxvY2FsIiwidXNlcklkIjoiMTE5OTU5ODg2IiwiZGlzcGxheV9uYW1lIjpbImRldmVsb3BlciIsImRldmVsb3BlciBkZXZlbG9wZXIgIl0sImZpcnN0X25hbWUiOiJkZXZlbG9wZXIiLCJsYXN0X25hbWUiOiJkZXZlbG9wZXIiLCJmdWxsX25hbWUiOiJkZXZlbG9wZXIgZGV2ZWxvcGVyICIsInNob3J0X25hbWUiOiJkZXZlbG9wZXIgRC4iLCJlbWFpbCI6IjFAZ21haWwuY29tIiwiZm91bmRfcm9sZXMiOiJzay1zZW5pb3JfYWRtIiwiYW1yIjpbInB3ZCJdfQ.pT6aq9PmIxR20Rue08LlwL1WjVOSp1obYRHzvr3SdmCUvscArWgowDxgqiKayc-WLeHXbNKgq0BDpYiL2k4_SYma9YD6859_rG1NICimBQqQsFDG5ewDwv7awzKr3Qm1pAhI8gKsqRk0WEX5m_BqoSw1pEhwq5Gj_pLmqhKPDbiwarRQGid0AkRKlXiuoiKC_URZTaU31my2jKkUv63feegihHceDDqm-LcNAjQg9TdWfld8ap3bDA1LHzMUPu-igvsnhhdYFJjelvZiemZJVSJ7a9RyGe2xgV7OX7bEAyNlNJkSCCsCtefjWowZZoiac_0CIqH2ghHWgehCpAW1KA',
  session_state: 'F3TppyAt-mTBrr0rLI3Byq-FQZH2fPlV3HMLEqAxnfU.i_De2rdtr4cdeWexNFRAKw',
  access_token:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3QjZEMEMwNzBCN0I0Q0M0MzMyMzcyNjk3Nzk4NkI3MTYxNDQ2N0UiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKN2JRd0hDM3RNeERNamNtbDNtR3R4WVVSbjQifQ.eyJuYmYiOjE2NzA5NDc2ODYsImV4cCI6MTY3MDk5MDg4NiwiaXNzIjoiaHR0cHM6Ly9pczQtc3BlY2lhbGlzdC5kZXYxLnNrZGYubG9jYWwiLCJhdWQiOiJza2RmX2FwaSIsImNsaWVudF9pZCI6InNrZGYiLCJzdWIiOiJkLmRldmVsb3BlciIsImF1dGhfdGltZSI6MTY3MDk0NzY4NCwiaWRwIjoibG9jYWwiLCJ1c2VySWQiOiIxMTk5NTk4ODYiLCJkaXNwbGF5X25hbWUiOlsiZGV2ZWxvcGVyIiwiZGV2ZWxvcGVyIGRldmVsb3BlciAiXSwiZmlyc3RfbmFtZSI6ImRldmVsb3BlciIsImxhc3RfbmFtZSI6ImRldmVsb3BlciIsImZ1bGxfbmFtZSI6ImRldmVsb3BlciBkZXZlbG9wZXIgIiwic2hvcnRfbmFtZSI6ImRldmVsb3BlciBELiIsImVtYWlsIjoiMUBnbWFpbC5jb20iLCJmb3VuZF9yb2xlcyI6InNrLXNlbmlvcl9hZG0iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwic2tkZl9hcGkiXSwiYW1yIjpbInB3ZCJdfQ.lfq8Mroae7M7YqUo0hCjY1Mmqz7w_VO8gjh85-Bj3sDZMRZpXpsGzMeDleMynvJmBTOziDLq5qNTGQ_Q6rOAwlucxME8GGQDuEL9hUTX-4AIfDl4y6FDIHmcVRiyK8msQoKbYMgzEmeWnraDkyClLmgNNbB1m5q27LJRVgi3mjhknxSsSrNpbKPT8DU-JMAP3E-m8JyDtWa576T5CByjqu-L4ZWWr0wdAOhI5HYc7oVBi7wYeMPKIt7c244hoewTsE-IgRcfV5ooTawk15wwgw0Tox4MaA1CwCqqUPCIcvcZF52DQ6I0Zd7VbsVauPXdRE46TF8aLosNEB6cK-I5lg',
  token_type: 'Bearer',
  scope: 'openid profile skdf_api',
  profile: {
    s_hash: 'MsKpUp4Dn_OvblFMKNHRBA',
    sid: '0a63vJzJ-UMPUg-Ww17sGA',
    sub: 'd.developer',
    idp: 'local',
    userId: '119959886',
    display_name: ['developer', 'developer developer '],
    first_name: 'developer',
    last_name: 'developer',
    full_name: 'developer developer ',
    short_name: 'developer D.',
    email: '1@gmail.com',
    found_roles: 'sk-senior_adm',
  },
  expires_at: 1670990886,
};

function Map() {
  const location = useLocation();
  // const match = useMatch(location.pathname);
  const navigate = useNavigate();
  const params = useParams();
  const history = {
    push({ pathname }: { pathname: string }) {
      navigate(pathname);
    },
  };

  return (
    <MapContainer
      routerRest={{ location, match: { params }, history }}
      // userAuth={userStoreInstance.user}
      userAuth={userAuth}
    />
  );
}

const AppLayout = () => (
  <>
    <Sidebar />
    <div className={sidebarClasses.sidebarContent}>
      <Outlet />
    </div>
  </>
);

function App() {
  return (
    <div className="App">
      <AuthWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route element={<AppLayout />}>
              {/* <Route path="/map" element={<MapContainer />} /> */}
              {/* <Route path="/map/:id" element={(rest) => <MapContainer routerRest={rest} />} /> */}
              <Route path="/map" element={<Map />} />
              <Route path="/map/:id" element={<Map />} />
              <Route path="/map/:id/:edit" element={<Map />} />
              <Route path="/roads" element={<ProtectedRoute matrixKey="menu_roads" element={<RoadsPage />} />} />
              <Route path="/roads/:id" element={<ProtectedRoute matrixKey="menu_roads" element={<RoadPage />} />} />
              <Route path="/roadsOnBalance/:id" element={<RoadsOnBalancePage />} />
              <Route path="/backboneNetwork/:id" element={<BackboneNetworkPage />} />
              <Route
                path="/traffic-accidents"
                element={<ProtectedRoute matrixKey="menu_accidents" element={<AccidentsPage />} />}
              />
              <Route
                path="/traffic-accidents/:id"
                element={<ProtectedRoute matrixKey="menu_accidents" element={<AccidentPage />} />}
              />
              <Route path="/bridges" element={<ProtectedRoute matrixKey="menu_bridges" element={<BridgesPage />} />} />
              <Route path="/bridges/:id" element={<BridgePage />} />
              <Route path="/skdf-design/*" element={<SkdfDesign />} />
              <Route path="/indicators/:title" element={<FramePage />} />
              <Route
                path="/account"
                element={<ProtectedRoute matrixKey="menu_account_page" element={<AccountPage />} />}
              />
              <Route path="/desktop" element={<ProtectedRoute matrixKey="menu_desktop" element={<Desktop />} />} />
              <Route
                path="/notifications"
                element={<ProtectedRoute matrixKey="menu_notifications" element={<NotificationsPage />} />}
              />
              <Route
                path="/newsletter"
                element={<ProtectedRoute matrixKey="menu_newsletter" element={<NewsletterPage />} />}
              />
              <Route
                path="/roadDiagnostics/:id"
                element={<ProtectedRoute matrixKey="menu_road_diagnostics" element={<RoadDiagnosticsPage />} />}
              />
              <Route path="/events/*" element={<ProtectedRoute matrixKey="menu_events" element={<Events />} />} />
              <Route path="*" element={<PseudoElement />} />
            </Route>
          </Routes>
        </Router>
      </AuthWrapper>
      <ToastifyContainer />
    </div>
  );
}

export default App;
