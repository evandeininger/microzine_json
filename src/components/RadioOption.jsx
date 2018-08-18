import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RadioOption extends Component {
	state = {};
	static propTypes = {};

	render() {
		return (
			<React.Fragment>
				<input
					type="radio"
					id={this.props.value}
					name={this.props.value}
					// defaultChecked={this.props.checked}
					checked={this.props.checked}
					onChange={() => this.props.selectedOption(this.props.value)}
				/>
				<label htmlFor={this.props.value}>{this.props.children}</label>
			</React.Fragment>
		);
	}
}

export default RadioOption;
