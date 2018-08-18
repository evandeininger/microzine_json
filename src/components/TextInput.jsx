import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
	constructor(props) {
		super(props);
		this.defaultValue = props.initialValue ? props.initialValue : '';
		props.inputValue(this.defaultValue);
	}

	static propTypes = {
		initialValue: PropTypes.string,
		inputValue: PropTypes.func.isRequired
	};

	state = {};

	handleChange(e) {
		this.props.inputValue(e.target.value);
	}
	render() {
		return (
			<input
				ref={ref => {
					this.input = ref;
				}}
				onChange={this.handleChange.bind(this)}
				type="text"
				placeholder="Enter the desired name of file"
				defaultValue={this.defaultValue}
			/>
		);
	}
}

export default TextInput;
