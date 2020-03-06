import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
	static propTypes = {
		error: PropTypes.object.isRequired,
		message: PropTypes.object.isRequired
	};
	componentDidUpdate(prevProps) {
		const { error, alert, message } = this.props;
		//this.props.alert.show('It Works!'); when reload say it works on didmount
		if (error !== prevProps.error) {
			alert.error('Datos no Válidos o ya existen');
		}

		if (message !== prevProps.message) {
			if (message.deleteLead) alert.success(message.deleteLead);
			if (message.addLead) alert.success(message.addLead);
		}
	}
	render() {
		return <Fragment />;
	}
}

const mapStateToProps = (state) => ({
	error: state.errors, // the reducer we want is errors
	message: state.messages
});
export default connect(mapStateToProps)(withAlert()(Alerts));
