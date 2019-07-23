import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
// import { exportAllDeclaration } from '@babel/types';
import NavigationItem from './NaigationItem/NaigationItem';

configure({ adapter: new Adapter() }); //js object

describe('<NavigationItems/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    // here we are selected NavigationItems becuase if the authestication success then it go to home page otherwise it shows auth page
    it('should render two <NavigationItems/> elements if not authenticated', () => {
        // const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    // here we are checking if 'isAuthenticated' is "true" only props in that navigationitems only
    it('should render three <NavigationItems/> elements if not authenticated', () => {
        wrapper.setProps({ isAuthenticated: true }); //(or)
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});