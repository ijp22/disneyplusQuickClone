import logo from '../public/disney.png';
import Image from 'next/image';

const Navbar = ({ account }) => {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <a href="/">
          <Image src={logo} alt="Disney Logo" width={90} height={50} />
        </a>
      </div>

      <div className="account-info">
        <p>Welcome {account.username}</p>
        <img className="avatar" src={account.avatar.url} />
      </div>
    </div>
  );
};

export default Navbar;
