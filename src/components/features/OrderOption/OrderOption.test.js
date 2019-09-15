/* eslint-disable linebreak-style */

import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render', () => {
    const component = shallow(<OrderOption type="example" name="example" />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  /* it('should render correct name', () => {
    const expectedName = 'abc';
    const component = shallow(<OrderOption name={expectedName} />);
    expect(component.find('.title').text()).toEqual(expectedName);
  });  */

  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };

  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };

  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: {currentValue: [mockProps.currentValue]},
    number: {currentValue: 1},
    text: {},
    date: {},
  };

  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;

  for (let type in optionTypes) {
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */

      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;

      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
      });

      /* common tests */

      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy();
        expect(subcomponent.length).toBe(1);
      });

      /* type-specific tests */

      switch (type) {
        case 'dropdown': {
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent
              .find('select')
              .simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({
              [mockProps.id]: testValue,
            });
          });
          break;
        }
        case 'number': {
          it('contains input', () => {
            const input = renderedSubcomponent.find('input');
            expect(input.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent
              .find('input')
              .simulate('change', {currentTarget: {value: testValueNumber}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({
              [mockProps.id]: testValueNumber,
            });
          });
          break;
        }
        case 'icon': {
          it('contains divs with class icon', () => {
            const divs = renderedSubcomponent.find('.container');
            expect(divs.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('icon').last().simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({
              [mockProps.id]: testValue,
            });
          });
          break;
        }
        case 'date': {
          it('render datePicker', () => {
            const datePicker = renderedSubcomponent.find('DatePicker');
            expect(datePicker).toBeTruthy();
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent
              .find('DatePicker')
              .simulate('change', testValue);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({
              [mockProps.id]: testValue,
            });
          });
          break;
        }
        case 'text': {
          it('contain div and input', () => {
            const div = renderedSubcomponent.find('div');
            const input = renderedSubcomponent.find('input');
            expect(div.length).toBe(1);
            expect(input.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent
              .find('input')
              .simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({
              [mockProps.id]: testValue,
            });
          });
          break;
        }
        case 'checkboxes': {
          it('contain div and label', () => {
            const divs = renderedSubcomponent.find('div');
            const label = renderedSubcomponent.find('label');
            expect(divs.length).toBe(1);
            expect(label.length).toBe(2);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent
              .find('input')
              .at(1)
              .simulate('change', {currentTarget: {checked: true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({
              [mockProps.id]: [mockProps.currentValue, testValue],
            });
          });
          break;
        }
      }
    });
  }
});
