import "../style.css"
import axios from "axios";
import Link from 'next/link';


import Nav from 'components/nav/nav.jsx';
import Footer from 'components/footer/footer.jsx';
import LinksNav from "components/setting/nav"

import Assistants from "components/assistants/assistants";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { faGears, faHouse, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

// icons

const Page = () => {



  return (<div className='row justify-content-between flex-column'>
    <Nav />

    <div className="" style={{ margin: "0", marginRight: "30px", marginLeft: "30px", minHeight: "calc(100vh - 170px)" }}>
      <div className="row gutters-sm">
        <SideBarContainer>
          <SideBarLinks icon={faHouse} label={"home"} href={"/setting"} Aclass={""} />
          <SideBarLinks icon={faUser} label={"Add Assistant"} href={"/setting/add-assistant"} Aclass={""} />
          <SideBarLinks icon={faUsers} label={"Assistants"} href={"/setting/assistants"} Aclass={"active"} />
          <SideBarLinks icon={faGears} label={"Account Settings"} href={"/setting/account"} Aclass={""} />
        </SideBarContainer>
        <div className="col-md-8">
          <div className="card">
            <LinksNav active="assistant" />
            <div className="card-body tab-content">
              <div className="tab-pane active" id="addAssistant">
                <h6>ADD NEW ASSISTANTS</h6>
                <hr />
                <div className="w-100 h-100 row justify-content-center" style={{ margin: "0" }} >
                  <Assistants />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>



    <Footer />
  </div>

  );
}

export default Page;
