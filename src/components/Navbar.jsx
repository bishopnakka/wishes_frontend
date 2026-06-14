import {
  Link,
  useNavigate
} from 'react-router-dom';

import '../styles/navbar.css';

export default function Navbar() {

  const navigate =
    useNavigate();

  const role =
    localStorage.getItem(
      'role'
    );

  const logout = () => {

    localStorage.clear();

    navigate('/login');

  };

  return (

    <nav className='navbar'>

      <Link
        to='/'
        className='logo'
      >

        Wishop

      </Link>

      <div className='nav-links'>

        <Link to='/'>
          Home
        </Link>

        {

          role && (

            <Link to='/dashboard'>
              Dashboard
            </Link>

          )

        }

        {

          role === 'admin' && (

            <Link to='/admin'>
              Admin Panel
            </Link>

          )

        }

        {

          role ? (

            <button
              className='logout-btn'
              onClick={logout}
            >

              Logout

            </button>

          ) : (

            <Link
              className='login-btn'
              to='/login'
            >

              Login

            </Link>

          )

        }

      </div>

    </nav>

  );

}