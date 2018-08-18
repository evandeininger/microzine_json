import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RadioGroup extends Component {
	state = {
		selected: this.props.children.find(child => {
			return child.props.selected && child.props.value;
		})
	};
	static propTypes = {
		inputValue: PropTypes.func.isRequired
	};

	selectedOption(selectedValue) {
		this.setState({
			selected: selectedValue
		});
		this.props.inputValue(selectedValue);
	}

	render() {
		return (
			<fieldset>
				{React.Children.map(this.props.children, child => {
					return React.cloneElement(child, {
						checked: this.state.selected === child.props.value,
						selectedOption: this.selectedOption.bind(this)
					});
				})}
			</fieldset>
		);
	}
}

export default RadioGroup;
