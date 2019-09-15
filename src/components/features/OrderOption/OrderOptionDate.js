/* eslint-disable linebreak-style */
import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class OrderOptionDate extends React.Component {
  state = {
    startDate: new Date(),
  };

  handleChange = date => {
    this.setState({
      startDate: date,
    });
    this.props.setOptionValue(date);
  };

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
