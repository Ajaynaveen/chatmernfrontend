import Maincontainer from './Maincontainer';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Chatarea from './Chatarea';
import Creategroup from './Creategroup';
import User from './User';
import User_group from './User_group';
import SignUp from './Signup';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<Maincontainer />}>
          <Route path='creategroup' element={<Creategroup />} />
          <Route path='welcome' element={<Welcome />} />
          <Route path='chat/:chatId' element={<Chatarea />} />
          <Route path='users' element={<User />} />
          <Route path='groups' element={<User_group />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
