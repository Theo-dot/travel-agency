/* eslint-disable linebreak-style */
import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render correct link', () => {
    const id = 'abc';
    const expectedLink = `/trip/${id}`;
    const component = shallow(<TripSummary id={id} tags={['tag1']} />);
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should render correct src and alt', () => {
    const expectedImage = 'image.jpg';
    const expectedAlt = 'Lorem';
    const component = shallow(
      <TripSummary image={expectedImage} name={expectedAlt} tags={['tag1']} />
    );
    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct name, cost and days', () => {
    const expectedName = 'Luke';
    const expectedCost = '1002323';
    const expectedDays = 10;
    const component = shallow(
      <TripSummary
        name={expectedName}
        cost={expectedCost}
        days={expectedDays}
        tags={['tag1']}
      />
    );
    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details span').at(0).text()).toEqual(`${expectedDays} days`);
    expect(component.find('.details span').at(1).text()).toEqual(`from ${expectedCost}`);
  });

  it('should throw error without props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render correctly tags array', () => {
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    const component = shallow(<TripSummary tags={expectedTags} />);

    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });

  it('should render props tags only if array contains tags', () => {
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    const component = shallow(<TripSummary tags={expectedTags} />);
    const renderedTags = component.find('.tags');

    expect(renderedTags).toBeTruthy();
  });

});
