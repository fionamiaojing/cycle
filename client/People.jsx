import React from 'react';
import Popup from 'reactjs-popup';

export default class People extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className='popupOverlay'>
                <div className='popUp'>
                    hello
                    <button onClick={() => this.props.togglePopUp('showPeople')}>Hello</button>
                </div>
            </div>
        );
    }
}
