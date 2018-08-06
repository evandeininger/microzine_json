import React, { Component } from 'react';
import api from 'helpers/api'


class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newJsonLocation: ''
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('templateName', this.templateName.value);

    api.uploadTemplate(data).then(res=>{
      res.json().then(body => {
        console.log(body);
        this.setState({ newJsonLocation: `http://localhost:8081/${body.file}` });
      });
    })
  }
  

  render() {
    return (
      <div className="App">
        <h1>FileUpload</h1>
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input
              ref={ref => {
                this.uploadInput = ref;
              }}
              type="file"
            />
          </div>
          <br />
          <div>
            <input
              ref={ref => {
                this.templateName = ref;
              }}
              type="text"
              placeholder="Enter the desired name of file"
            />
          </div>
          <br />
          <div>
            <button>Upload</button>
          </div>
          <hr />
          <p>Uploaded json:</p>
          {this.state.newJsonLocation}
        </form>
      </div>
    );
  }
}

export default MainPage;