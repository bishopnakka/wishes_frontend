
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateWish from './pages/CreateWish';
import WishView from './pages/WishView';
import ProtectedRoute from './components/ProtectedRoute'
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import EditWish from './pages/EditWish';

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={ <ProtectedRoute>  <Dashboard /> </ProtectedRoute>}/>
        <Route path='/create/:id' element={ <ProtectedRoute>  <CreateWish /></ProtectedRoute>}/>
        <Route path='/wish/:id' element={<WishView />} />
        <Route path='/admin' element={ localStorage.getItem(  'role' ) === 'admin' ? <AdminPanel />: <Home />}/>
        <Route

  path='/edit/:id'

  element={
    <EditWish/>
  }

/>
      </Routes>
    </BrowserRouter>
  );
}