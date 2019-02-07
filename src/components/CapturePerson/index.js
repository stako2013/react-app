import axios from 'axios';
import React, { Component } from 'react';

class CapturePerson extends Component {

    state = {
        personName: '',
        maxCountConsecutiveZero: ''
    }

    handleSendBtnClick = async (e) => {
        e.preventDefault();
        const { personName } = this.state;
        if (personName !== '') {
            const response = await this.saveName(personName);
            if (response) {
                this.setState({ maxCountConsecutiveZero: response.maxCountConsecutiveZero })
            }
        }

    }

    saveName = (personName) => {

        return axios.post('http://localhost:8080/v1/persons/', { "name": personName })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    handleInputChange = (e) => {
        const personName = e.target.value;
        this.setState({ personName: personName })
    }

    render() {
        const { personName, maxCountConsecutiveZero } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <label>Enter your full name: </label>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={personName} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-info btn-block" onClick={this.handleSendBtnClick}>Send</button>
                    </div>
                </div>
                <div className="row">
                    {
                        maxCountConsecutiveZero !== '' ?
                            <label>The largest number of consecutive zeros: {maxCountConsecutiveZero}</label>
                            :
                            ""
                    }
                </div>
            </div>
        );
    }
}

export default CapturePerson;