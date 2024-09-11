import LinksNav from "components/sutdents/nav"

const RightSide = ({ children, title }) => {
  return (
    <div className="col-12" style={{ padding: "0" }}>
      <div className="card">
        <div className="card-body tab-content">
          <div className="tab-pane fade show active " id="home">
            <h6>{title}</h6>
            <hr />
            <div className="" style={{ justifyContent: "center", alignItems: "center" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
