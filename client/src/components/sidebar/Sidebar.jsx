import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
// import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

export default function Sidebar({ isVisible }) {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);

  const getFriends = async (id) => {
    const friends = await axios.get(`/users/friends/${id}`);
    setFriends(friends.data);
  }

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      let parseData = JSON.parse(storedData);
      setUser(JSON.parse(storedData));
      getFriends(parseData._id);
    }
  }, []);

  // useEffect(()=>{
  //   // getFriendList();
  //   console.log(friends);
  // }, [friends])


return (
    <div className={`sidebar ${!isVisible ? 'sidebarHidden' : ''}`}>
      {/* <button onClick={() => setIsSidebarVisible(false)}>Close</button> */}
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText"><Link to={`/`}>Feed</Link></span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText"><Link to={`/messenger`}>Chats</Link></span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          {/* <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
  */}
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends.map((u) => (
            <CloseFriend key={u.id} user={u} />
            // <div>
            //   {u}
            // </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
