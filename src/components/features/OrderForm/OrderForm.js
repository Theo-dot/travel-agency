/* eslint-disable linebreak-style */
import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, countryCode, tripId, tripName) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    countryCode,
    tripId,
    tripName,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = props =>
  <Row>
    {pricing.map(option =>
      <Col key={option.id} md={4}>
        <OrderOption
          {...option}
          currentValue={props.options[option.id]}
          setOrderOption={props.setOrderOption}
        />
      </Col>
    )}
    <Col xs={12}>
      <OrderSummary price={props.tripCost} options={props.options} />
    </Col>
    <Button
      disabled={
        !(props.options.name.length > 0 && props.options.contact.length > 0)
      }
      onClick={() =>
        sendOrder(
          props.options,
          props.tripCost,
          props.countryCode,
          props.tripId,
          props.tripName
        )}
    >
      Order now!
    </Button>
  </Row>;

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
};

export default OrderForm;
