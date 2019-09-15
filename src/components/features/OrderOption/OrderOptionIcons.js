/* eslint-disable linebreak-style */
import React from 'react';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderOptionIcons = ({values, required, setOptionValue, currentValue}) =>
  <div className={styles.container}>
    {required ? '' : <div key="null" value="" />}
    <div className={styles.icon} onChange={() => setOptionValue('')}>
      <Icon name={'times-circle'} />None
    </div>
    {values.map(value =>
      <div
        className={` ${styles.icon} ${currentValue === value.id ? styles.iconActive: ''}`}
        key={value.id}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon} />
        {value.name} ({formatPrice(value.price)})
      </div>
    )}
  </div>;

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
};

export default OrderOptionIcons;
