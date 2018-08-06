import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPeople, deletePeople, postPeople } from './action';
const faker = require('faker');

class People extends React.Component{
    constructor(props) {
        super(props);
        // this.people = this.props.cycleData[this.props.index].people;
        this.state = {
            people: this.props.cycleData[this.props.index].people,
            displaySearchBar: 'none',
            input: '',
            disableAdd: 'true',
        };
    }

    componentDidUpdate(prevProps){
        if(prevProps.cycleData !== this.props.cycleData){
            this.setState({          
                people: this.props.cycleData[this.props.index].people
            });
        }
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

    handleDelete(name) {
        this.props.deletePeople(this.props.index, name);
        //
    }

    handleSave() {
        //ideally i should get the unique id (in database) of that person and only need to save id into cycle
        //call AddPeople function to push the new person into people array
        //I don't quite understand the diff between save and submit, If possible, I will ask my manager to clarify that
        // this.props.postPeople('username', this.props.index, {
        //     name: this.state.input,
        //     image: faker.image.avatar()
        // });
        //username should be saved somewhere
        console.log('saved');
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
                    {this.state.people.map((person) => 
                        <div>
                            <img className='avatar' src={person.image} alt=""/>
                            {person.name}
                            <button onClick={() => this.handleDelete(person.name)}>Delete</button>
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
        deletePeople,
        postPeople
    }, dispatch);
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(People);