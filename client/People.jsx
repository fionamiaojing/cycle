import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class People extends React.Component{
    constructor(props) {
        super(props);
        this.people = this.props.cycleData[this.props.index].people;
        this.state = {
            displaySearchBar: 'none'
        };
    }

    handleEditClick() {
        this.setState(prevState => {
            return {
                displaySearchBar: prevState.displaySearchBar === 'none' ? 'block' : 'none'
            };
        });
    }

    handleSearch() {
        
    }

    
    render() {

        return (
            <div className='popupOverlay'>
                <div className='popUp people'>
                    <div>
                        <section className='avatar' style={{backgroundColor: 'grey', display:'inline-block'}}></section>
                        UserName
                    </div>
                    <hr/>
                    <br/>
                    Your selections:
                    {this.people.map((person) => 
                        <div>
                            <img className='avatar' src={person.image} alt=""/>
                            {person.name}
                        </div>
                    )}
                    <div style={{display: this.state.displaySearchBar}}>
                        <input
                            type="text"
                            placeholder="Type a team member's name..."
                            onChange={event => this.handleSearch(event)}
                            style={{width: '80%'}}
                        />
                        <button>Add</button>
                    </div>
                    {this.state.displaySearchBar === 'block' ?
                        <button >SAVE</button> : 
                        <button onClick={() => this.handleEditClick()}>EDIT</button>}
                    <button onClick={() => this.props.togglePopUp('showPeople')}>Submit</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      cycleData: state.cycleData
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(People);