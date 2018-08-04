import React from 'react';
import ReactTable from 'react-table';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import People from './People.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            showPeople: false,
            showQuestion: false,
            selectedIndex: 0
        };
        this.togglePopUp = this.togglePopUp.bind(this);
    }

    togglePopUp(property) {
        this.setState(prevState => {
            return {[property]: !prevState[property]};
        });
    }

    handleClick(i) {
        this.setState({
            selectedIndex: i
        });
        this.togglePopUp('show');
    }

    renderPopUp() {
        return (
            <div className='popupOverlay'>
                <div className='popUp'>
                    <button className='popUpButton' onClick={() => this.togglePopUp('showPeople')}>People</button>
                    <button className='popUpButton'>Question</button>
                    <button className='cancel' onClick={() => this.togglePopUp('show')}>Cancel</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.props.cycleData}
                    columns={[
                        {
                            Header: "Cycle",
                            accessor: "cycle"
                        },
                        {
                            Header: 'Status',
                            accessor: 'status'
                        },
                        {
                            Header: '',
                            accessor: 'index',
                            Cell: row => (
                                
                                <button 
                                    onClick={() => this.handleClick(row.index)}
                                >
                                    Click Me
                                </button>

                            )
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                {this.state.show? this.renderPopUp() : ''}
                {this.state.showPeople? <People togglePopUp={this.togglePopUp}/> : ''}
            </div>
        );
    }
}

//I think use GraphQL will be a better solution, but I don't have much experience on that
const extractData = (rawData) => {
    return rawData.map((data) => {
        return {
            cycle: data.name,
            status: data.status,
        };
    });
}; 

const mapStateToProps = (state) => {
    return {
      cycleData: extractData(state.cycleData)
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(App);