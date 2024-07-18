import React from 'react';

const RightSide = ({ children }) => {
  return (
    <div className="col-md-8">
      <div className="card">
        {children}
        <div className="card-body tab-content">
          <div className="tab-pane fade show active " id="home">
            <h6>SESSIONS</h6>
            <hr />
            <div className="" style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
