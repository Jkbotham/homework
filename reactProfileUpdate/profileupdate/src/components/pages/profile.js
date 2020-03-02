import React from "react";
import "../../assets/css/style.css"


function Profile() {
    return (
        <div>
            <div className="content">
                <div className="container border mr-12" id="portPad">

                    <div className="row">
                        <div className="col-md-12">
                            <h1 id="portH1">Portfolio</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <a href="https://jkbotham.github.io/homework/firstProject/">
                                <div className="card bg-light mb-3 sportsBall" style={{"max-width": "23rem"}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Sports Ball</h5>
                                        <p className="card-text">This project focuses on NFL teams and info about their respective staidums</p>
                                        <figure className="figure">
                                            <img src="./images/firstProject/homepage.JPG" alt="first group project- sportsball 9000" className="figure-img img-fluid rounded" to="index.html" />
                                        </figure>
                                    </div>
                                </div>
                            </a>
                            <a href="https://www.jamesbotham.com/assets/pwgen/index.html">
                                <div className="card bg-light mb-3 pwGen" style={{"max-width": "23rem"}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Password Creator</h5>
                                        <p className="card-text">Password generator that allows the user to select different criteria and length of
                  the randomized password</p>
                                        <img src="./images/Pw/PwAppScreen.png" alt="a thumbnail of the password generator site"
                                            className="rounded img-thumbnail" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4 workTogether">
                            <div className="minH"></div>
                            <br />
                            <div className="row no-gutters">
                                <div className="col-md-2">
                                    <img src="./images/headshot.heic" alt="headshot" className="img-fluid workingTogImg" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <a href="contact.html">
                                            {/* <h5 className="card-title dkColor">Working Together</h5> */}
                                        </a>
                                        <br />
                                        <ul>
                                            <li><a href="https://github.com/Jkbotham"><h6 className="dkColor">Github</h6></a></li>
                                            <li><a href="https://www.aedin.com/in/james-botham-2949072b/"><h6 className="dkColor">Linkedin</h6></a></li>
                                            <li><a href="https://www.jamesbotham.com/assets/Resume.pdf"><h6 className="dkColor">Resume</h6></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;