import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../styles/Input.css';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        //background: 'white'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        //color: 'white',
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class OutlinedTextFields extends React.Component {

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                    error
                    id="outlined-error"
                    label="Search Email"
                    placeholder="Search Email"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange}
                />

            </form>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);