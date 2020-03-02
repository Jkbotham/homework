import React from "react";


function About() {
    return (
        <div>
            <div className="content">
                <div className="container border mr-15">

                    <div className="row">
                        <div className="col-md-12">
                            <h1>About</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <img src="./images/headshot.heic"  className="img-fluid rounded d-block pb-3" alt="James Botham" />
                        </div>
                        <div className="col-md-9">
                            <p className="text-justify"> My name is James Botham and I'm studying to become a web developer. I grew up in the west suburbs of Minneapolis and attended Augsburg University, graduating with a business management degree. Upon graduation I started a frozen food distribution company based in Minneapolis, MN.  After growing the company for a few years and doing over $700,000 in sales per year I decided to try my hand at something new.
                In my free time I like to play computer games such as Pubg, Counterstrike, World of Warcraft, and many other titles.  My other hobbies include boating on Lake Minnetonka, bouldering at my local gym, and playing golf.</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;