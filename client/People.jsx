import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPeople, deletePeople } from './action';
const faker = require('faker');

class People extends React.Component{
    constructor(props) {
        super(props);
        this.people = this.props.cycleData[this.props.index].people;
        this.state = {
            displaySearchBar: 'none',
            input: '',
            disableAdd: 'true',
        };
    }

    handleEditClick() {
        this.setState(prevState => {
            return {
                displaySearchBar: prevState.displaySearchBar === 'none' ? 'block' : 'none'
            };
        });
    }

    handleSearch(event) {
        this.setState({
            input: event.target.value
        });
        //I don't have people table so I just write some pseudoCode here
        //filter people table based on search input
        // - this.props.people.filter(person => person.toLowerCase() === event.target.value.toLowerCase());
        //if the filter gets an valid result (length === 1), enable add button
        this.setState({
            disableAdd: ''
        });
    }

    handleAdd() {
        this.props.addPeople(this.props.index, {
            name: this.state.input,
            image: faker.image.avatar()
        });

    }

    handleSave() {
        //ideally i should get the unique id (in database) of that person and only need to save id into cycle
        //call AddPeople function to push the new person into people array
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
                            value={this.state.input}
                            placeholder="Type a team member's name..."
                            onChange={event => this.handleSearch(event)}
                            style={{width: '80%'}}
                        />
                        <button 
                            disabled={this.state.disableAdd}
                            onClick={() => this.handleAdd()}
                        >Add</button>
                        <div>You must select at least two people</div>
                    </div>
                    {this.state.displaySearchBar === 'block' ?
                        <button onClick={() => this.handleSave()}>SAVE</button> : 
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
        addPeople,
        deletePeople
    }, dispatch);
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(People);