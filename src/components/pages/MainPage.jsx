import React, { Component } from 'react';
import api from 'helpers/api';
import TextInput from 'components/TextInput';
import RadioGroup from 'components/RadioGroup';
import RadioOption from 'components/RadioOption';
import PropTypes from 'prop-types';

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newJsonLocation: ''
		};

		this.handleUploadImage = this.handleUploadImage.bind(this);
	}

	static propTypes = {};
	static state = {
		templateName: '',
		selectedValueThing: ''
	};

	handleUploadImage(e) {
		e.preventDefault();

		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('templateName', this.state.templateName);

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
								this.setState({
									templateName: value
								});
							}}
							initialValue="Hello!"
						/>

						<RadioGroup
							inputValue={value => {
								this.setState({
									selectedValueThing: value
								});
							}}
							name="size"
							onChange={this.handleChange}>
							<RadioOption value="one">option 1</RadioOption>
							<RadioOption value="two" selected>
								option 2
							</RadioOption>
							<RadioOption value="three">option 3</RadioOption>
						</RadioGroup>
					</div>
					<br />
					<div>
						<button>Upload</button>
						{this.state.status}
					</div>
					<hr />
					<p>Uploaded json:</p>
					{this.state.newJsonLocation}
					{this.state.selectedValueThing}
				</form>
			</div>
		);
	}
}

export default MainPage;
