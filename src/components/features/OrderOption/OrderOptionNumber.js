/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';
import styles from './OrderOption.scss';

const OrderOptionNumber = ({currentValue, setOptionValue, price, limits}) => {
  return (
    <div className={styles.number}>
      <input
        className={styles.inputSmall}
        type="number"
        value={currentValue}
        min={limits.min}
        max={limits.max}
        onChange={event => setOptionValue(event.currentTarget.value)}
      />
       ({formatPrice(price)})
    </div>
  );
};

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.node,
  setOptionValue: PropTypes.func,
  limits: PropTypes.object,
  price: PropTypes.string,
};

export default OrderOptionNumber;
