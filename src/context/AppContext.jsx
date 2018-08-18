import React, { Component } from 'react';

const AppContext = React.createContext();

const reducer = (state, action) => {
	if (action.type === 'CHANGE_VIEW') {
		return { ...state, view: action.value };
	}

	if (action.type === 'FETCH_DATA') {
		return { ...state, tilelist: action.value };
	}
};

const AppProvider = class AppProvider extends Component {
	methods = {
		dispatch: action => {
			this.setState(state => reducer(state, action));
		}
	};

	state = {
		template: {},
		...this.methods
	};

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
};

const AppConsumer = AppContext.Consumer;

export { AppContext, AppProvider, AppConsumer };
