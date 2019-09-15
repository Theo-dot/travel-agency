/* eslint-disable linebreak-style */
import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

const OrderOptionText = ({setOptionValue}) =>
  <div>
    <input
      className={styles.input}
      type="text"
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
  </div>;

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
