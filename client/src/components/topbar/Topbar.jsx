import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from 'react-router-dom';
import axios from "axios";

export default function Topbar({ isSidebarVisible, setIsSidebarVisible }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // add this state
  const [apiUsers, setApiUsers] = useState([])
  const [searchItem, setSearchItem] = useState('')
  // set the initial state of filteredUsers to an empty array
  const [filteredUsers, setFilteredUsers] = useState([])
  // initialize the loading state as true
  const [loading, setLoading] = useState(true)
  // initialize the error state as null
  const [error, setError] = useState(null)
  
  const history = useHistory();

  const getUsers = async () => {
    try {
      const userlist = await axios.get(`/users/all`);
      // console.log("User list: ", userlist.data);
      setApiUsers(userlist.data);
      setFilteredUsers(userlist.data);
      setLoading(false);

    } catch(err) {
      console.log(err)
        // update the error state
      setError(err)
    }
}

// fetch the users 
  useEffect(() => {
    getUsers();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (searchItem) {
      history.push(`/profile/${searchItem}`);
    }else{
      console.log('no profile found')
    }
  };

  const handleInputChange = async (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  
    if (searchTerm) {
      try {
        const res = await axios.get(`/users/${searchTerm}`);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setFilteredUsers([]);
    }
  };


  return (
    <div className="topbarContainer">
      <button onClick={toggleSidebar} style={{ color: 'black', background: 'none', border: 'none', fontSize: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '20px', height: '2px', background: 'black', marginBottom: '2px' }}></div>
      <div style={{ width: '20px', height: '2px', background: 'black', marginBottom: '2px' }}></div>
      <div style={{ width: '20px', height: '2px', background: 'black' }}></div>
    </button>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Connecta</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          {/* <input
            list="searchbar"
            id="searchbarid"
            placeholder="Search for friend, post or video"
            className="searchInput"
          /> */}
          <form onSubmit={handleFormSubmit}>
            <input
              list="searchbar"
              id="searchbarid"
              placeholder="Search"
              className="searchInput"
              value={searchItem}
              onChange={handleInputChange}
            />
          </form>
          <datalist id="searchbar">
            {/* if the data is loading, show a proper message */}
          {loading && <option value="Loading...." />}
          {/* if there's an error, show a proper message */}
          {error && <option value="There was an error loading the users" />}
          {/* if it finished loading, render the items */}
          {!loading && !error && filteredUsers.length === 0
            ? <option value="No users found" />
            : 
            <>
              {filteredUsers.map(user => <option key={user._id} value={user.username} />)}
              {/* // <option value="Users found" /> */}
            </>
      
          }
          </datalist>
        </div>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarLinks"> */}
          {/* <span className="topbarLink">Homepage</span> */}
          {/* <span className="topbarLink">Timeline</span> */}
        {/* </div> */}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

