import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import TextFieldGroup from '../common/TextFieldGroup';
import ParticipantInputs from './ParticipantInputs';

class CourseForm extends Component {
    state = {
        name: '',
        date: '',
        companyName: '',
        companyPhone: '',
        companyEmail: '',
        participants: [{name: '', phone: '', email: ''}],
        templates: [],
        errors: {}
    }

    componentDidMount() {
        axios.get('/api/templates')
            .then(res => {
                this.setState({templates: res.data})
            })
            .catch(errors => {
                this.setState({errors});
            });
    }

    onChange = e => {
        const {name, value, classList} = e.target;
        if (classList.contains('name')) {
            let participants = [...this.state.participants];
            participants[e.target.dataset.id]['name'] = value;
            this.setState({participants});
        }
        if (classList.contains('phone')) {
            let participants = [...this.state.participants];
            participants[e.target.dataset.id]['phone'] = value;
            this.setState({participants});
        }
        if (classList.contains('email')) {
            let participants = [...this.state.participants];
            participants[e.target.dataset.id]['email'] = value;
            this.setState({participants});
        }
        else {
            this.setState({[name]: value});
        }
    };

    addParticipant = e => {
        e.preventDefault();
        this.setState((prevState) => ({
            participants: [...prevState.participants, {name: '', phone: '', email: ''}]
        }))
    }

    onSubmit = e => {
        e.preventDefault();

        const course = {
            name: this.state.name,
            date: this.state.date,
            companyName: this.state.companyName,
            companyPhone: this.state.companyPhone,
            companyEmail: this.state.companyEmail,
            participants: this.state.participants
        };

        // Axios post
        axios.post('/api/courses', course)
            .then(res => {
                this.setState({
                    name: '',
                    date: '',
                    companyName: '',
                    companyPhone: '',
                    companyEmail: '',
                    participants: [{name: '', phone: '', email: ''}],
                    errors: {}
                })
                this.props.addCourse(res);
            })
            .catch(err => {
                this.setState({errors: err.response.data})
            });
    };

    render() {
        const { errors, templates } = this.state;
        let dateOptions = [];
        if (templates && templates.length > 0 && this.state.name !== '') {
            dateOptions = templates
                .filter(template => template.name === this.state.name)[0].dates
                .map((date, index) => (
                    <option key={'date-'+index} value={date}>
                    {date}
                    </option>
                ))
        }
        
        return (
            <div className='container' style={{height: '1000px'}}>
                <div className='row'>
                    <div className='col-md-12 m-auto'>
                        <form onSubmit={this.onSubmit}>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h1><strong>Course</strong></h1>
                                </div>
                                <div className='col-md-6 m-auto'>
                                    <small>NAME*</small>
                                    <select
                                        name="name"
                                        className={classnames("form-control", {'is-invalid': errors.name})}
                                        value={this.state.name || ""}
                                        onChange={this.onChange}
                                    >
                                        <option />
                                        {this.state.templates.map(template => (
                                            <option key={template._id} value={template.name}>
                                            {template.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                <div className='col-md-6 m-auto'>
                                    <small>DATE</small>
                                    <select
                                        name="date"
                                        className={classnames("form-control", {'is-invalid': errors.date})}
                                        value={this.state.date || ""}
                                        onChange={this.onChange}
                                    >
                                        <option />
                                        {dateOptions}
                                    </select>
                                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h1><strong>Company</strong></h1>
                                </div>
                                <div className='col-md-12'>
                                    <small>NAME*</small>
                                    <TextFieldGroup
                                        name="companyName"
                                        value={this.state.companyName}
                                        onChange={this.onChange}
                                        error={errors.companyName}
                                    />
                                </div>
                                <div className='col-md-5 m-auto'>
                                    <small>PHONE*</small>
                                    <TextFieldGroup
                                        name="companyPhone"
                                        value={this.state.companyPhone}
                                        onChange={this.onChange}
                                        error={errors.companyPhone}
                                    />
                                </div>
                                <div className='col-md-7 m-auto'>
                                    <small>EMAIL*</small>
                                    <TextFieldGroup
                                        name="companyEmail"
                                        value={this.state.companyEmail}
                                        onChange={this.onChange}
                                        error={errors.companyEmail}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h1><strong>Participants</strong></h1>
                                </div>
                            </div>
                            <ParticipantInputs participants={this.state.participants} onChange={this.onChange} errors={errors} />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <button className='btn btn-info' onClick={this.addParticipant} >Add participant</button>
                                </div>
                            </div>
                            <input type="submit" value="Submit application" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseForm;