import React from "react";

export default function SearchList({ userList }) {
  return (
      <div className="row mt-4">
        {userList?.map((x, i) => {
          return <div className="col-xs-12 col-sm-6 col-md-4" key={i}>
              <div className="image-flip">
                <div className="mainflip flip-0">
                  <div className="frontside">
                    <div className="card">
                      <div className="card-body text-center">
                        <p>
                          <img
                            className=" img-fluid"
                            src={x.avatar_url}
                            alt="card image"
                          />
                        </p>
                        <h4 className="card-title">Username : {x.login}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="backside">
                    <div className="card">
                      <div className="card-body text-center">
                        <p>
                          <img
                            className=" img-fluid"
                            src={x.avatar_url}
                            alt="card image"
                          />
                        </p>
                        <p className="card-title">Username : {x.login}</p>
                        <p className="card-title">Score : {x.score}</p>
                        <p className="card-title">Type : {x.type}</p>
                        <p className="card-title">Profile : {x.html_url}</p>
                        <p className="card-title">Repository : {x.repos_url}</p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        })}
      </div>
  );
}
