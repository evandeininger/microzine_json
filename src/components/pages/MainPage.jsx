import React, { Component } from 'react';
import api from 'helpers/api';
import TextInput from 'components/TextInput';

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
		data.append('templateName', this.templateName);

		api
			.uploadTemplate(data)
			.then(({ data }) => {
				console.log(data);
				this.setState({
					status: ``,
					newJsonLocation: `http://localhost:8081/${data.file}`
				});
			})
			.catch(err => {
				this.setState({
					status: `Upload Failed ${err}`
				});
			});
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
						<TextInput
							inputValue={value => {
								this.templateName = value;
							}}
							initialValue="Hello!"
						/>
					</div>
					<br />
					<div>
						<button>Upload</button>
						{this.state.status}
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
