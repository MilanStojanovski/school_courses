import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = props => {
    const {
        name,
        placeholder,
        value,
        error,
        type,
        onChange,
        disabled,
        className,
        dataId
    } = props;
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames(`${className} form-control form-control-lg`, {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                data-id={dataId}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;
