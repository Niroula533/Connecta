import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
// import { useState } from 'react';

// export default function Home() {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   }

//   return (
//     <>
//       <Topbar />
//       <button onClick={toggleSidebar}>
//         {isSidebarVisible ? 'Close Sidebar' : 'Open Sidebar'}
//       </button>
//       <div className="homeContainer">
//         <Sidebar isVisible={isSidebarVisible} />
//         <Feed/>
//         <Rightbar/>
//       </div>
//     </>
//   );
// }

import { useState } from 'react';

export default function Home() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <>
      <Topbar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />
      <div className={`homeContainer ${isSidebarVisible ? 'shifted' : ''}`}>
        <Sidebar isVisible={isSidebarVisible} />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}