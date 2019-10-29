import React from 'react';

import TextFieldGroup from '../common/TextFieldGroup';

const ParticipantInputs = props => {
    const { participants } = props;
    return (
        participants.map((participant, index) => {
            let nameId = `name-${index}`;
            let phoneId = `phone-${index}`;
            let emailId = `email-${index}`;
            return (
                <div className='row' key={index}>
                    <div className='col-md-12'>
                    <h3>Participant #{index+1}</h3>
                        <small>NAME*</small>
                        <TextFieldGroup
                            name={nameId}
                            className="name"
                            dataId={index}
                            value={participant.name}
                            onChange={props.onChange}
                            error={props.errors.participants && props.errors.participants[index] ? props.errors.participants[index].name: null}
                        />
                    </div>
                    <div className='col-md-5 m-auto'>
                        <small>PHONE</small>
                        <TextFieldGroup
                            name={phoneId}
                            className="phone"
                            dataId={index}
                            value={participant.phone}
                            onChange={props.onChange}
                        />
                    </div>
                    <div className='col-md-7 m-auto'>
                        <small>Email</small>
                        <TextFieldGroup
                            name={emailId}
                            className="email"
                            dataId={index}
                            value={participant.email}
                            onChange={props.onChange}
                        />
                    </div>
                </div>
            )
        })
    )
}

export default ParticipantInputs;