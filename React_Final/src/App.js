// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/mainPage/mainPageStyle.css'
import './components/movies/Movies_Style.css'

import { Route , Routes} from 'react-router-dom';

import Login from './components/login/LogIn';
import CreateAccount from './components/login/CreateAccount';


import MainPage from './components/mainPage/MainPage';

import MoviesPage from './components/movies/Movies';
import AllMovies from './components/movies/AllMoviesPage'
import AddMovie from './components/movies/AddMovie'
import EditMovie from './components/movies/EditMovie';

import Subscriptions from './components/subscriptions/Subscriptions';
import AllMembersPage from './components/subscriptions/AllMembersPage'
import AddMember from './components/subscriptions/AddMember'
import EditMember from './components/subscriptions/EditMember'

import BlankPage from './components/mainPage/BlankPage';

import UserMang from './components/userManag/UserManag';
import AllUsersPage from './components/userManag/AllUsersPage'
import AddUser from './components/userManag/AddUser'
import EditUser from './components/userManag/EditUser'



function App() {
  return (
    <div >
      
        <Routes>
             <Route path="/" element= {<Login/>}/>
             <Route path="/createAccount" element= {<CreateAccount/>} / >
             
             <Route path='/mainPage/*' element= {<MainPage/>}>

                <Route  path="movies/*" element={<MoviesPage/>}> 
                    <Route  path="allMovies" element={<AllMovies/>}/> 
                    <Route  path="addMovie" element={<AddMovie/>}/> 
                    <Route  path="blankPage" element= {<BlankPage/>}/>
                    <Route  path="editPage" element={<EditMovie/>}/>
                </Route>

                  <Route  path="subscriptions/*" element={<Subscriptions/>}> 
                    <Route  path="allMembers" element={<AllMembersPage/>}/> 
                    <Route  path="addMember" element={<AddMember/>}/> 
                    <Route  path="blankPage" element= {<BlankPage/>}/>
                    <Route  path="editMember" element={<EditMember/>}/>
                  </Route>

                  <Route  path="userManag/*" element={<UserMang/>}> 
                    <Route  path="allUsers" element={<AllUsersPage/>}/> 
                    <Route  path="addUser" element={<AddUser/>}/> 
                    <Route  path="blankPage" element= {<BlankPage/>}/>
                    <Route  path="editUser" element={<EditUser/>}/>
                  </Route>

                  <Route  path="blankPage"  element= {<BlankPage/>}/>
            


             </Route>
             

        </Routes>
    </div>
  );
}

export default App;
