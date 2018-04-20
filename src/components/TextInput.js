import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ id, isMin, changeHandler }) => {
    const placeholder = isMin ? 'Min' : 'Max';
    return (
        <input
            id={id}
            size="5"
            type="text"
            maxLength="2"
            placeholder={placeholder}
            onChange={changeHandler}
        />
    );
};

TextInput.propTypes = {
    id: PropTypes.string,
    isMin: PropTypes.bool,
    changeHandler: PropTypes.func
};

TextInput.defaultProps = {
    id: '',
    isMin: false,
    changeHandler: () => {}
};

export default TextInput;
