import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const classes = useStyles()
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  
  return (
    <React.Fragment>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">Sign Up</Typography>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <TextField
            type='text'
            placeholder='Name'
            name='name'
            variant="outlined"
            fullWidth
            label="First Name"
            autofocus
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <TextField 
            type='email'
            variant="outlined"
            fullWidth
            placeholder='Email Address'
            name='email'
            label="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <TextField
            type='password'
            variant="outlined"
            fullWidth
            label="Password"
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <TextField
            type='password'
            variant="outlined"
            fullWidth
            label="Confirm Password"
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <Button fullWidth
          variant="contained"
          color="primary"
          type='submit'
          className={classes.submit}
          value='Register'>Register</Button>
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
      </div>
      </Container>
    </React.Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
