import logo from '../assets/logomark.png'
import Navbars from './Navbars'

function Header() {
  return (
    <>
      <div className="container-fluid d-flex justify-content-between align-items-center vh-30">

        <div className="d-flex justify-content-start align-items-center p-2 ">
          <img src={logo} alt="Logo" style={{ width: '40px', height: '40px' }} className="me-2" />
          <h2 className="m-3">Gradious</h2>
        </div>
        <Navbars />    
      </div>

    </>
  )
}

export default Header