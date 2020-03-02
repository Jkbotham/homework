import React from "react";

function Contact() {
    return(
        <div className="content">
        <div className="container border mr-15">
  
            <div className="row">
                <div className="col-md-12">
                      <h1>Contact</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <hr />
                </div>
            </div>
  
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="form-group">
                    <label for="nameImput">Name</label>
                    <input type="email" className="form-control" id="nameImput" placeholder="John Doe" />
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="form-group">
                    <label for="emailImput">Email address</label>
                    <input type="email" className="form-control" id="emailImput" placeholder="name@example.com" />
                </div>
              </form>
            </div>
          </div>
          <div className="row">
              <div className="col-md-12">
                  <div className="form-group">
                      <label for="messageImput">Message</label>
                      <textarea className="form-control" id="messageImput" rows="6"></textarea>
                  </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
  
  
          </div>
        </div>
    )
}

export default Contact;