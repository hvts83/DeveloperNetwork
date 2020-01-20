import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles(theme => ({
	root: {
	  '& > *': {
		margin: theme.spacing(1),
		width: 400,
	  },
	},
}));

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const classes = useStyles();
  return (
    <Fragment>
    <Container>
    <CssBaseline/>

      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form
        className={classes.root}
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <FormControl>
          <TextField
            type='text'
            label='School or Bootcamp'
            placeholder='* School or Bootcamp'
            variant='outlined'
            name='school'
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            label='Degree or Certificate'
            placeholder='* Degree or Certificate'
            variant='outlined'
            name='degree'
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            label='Field of Study'
            variant='outlined'
            placeholder='Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
          />
        </FormControl>
        <FormControl>
        <FormHelperText>From Date</FormHelperText>
          <TextField
            type='date'
            variant='outlined'
            name='from'
            value={from}
            onChange={e => onChange(e)}
          />
          
        </FormControl>
        <FormControl>
          <FormHelperText>Current</FormHelperText>
            <TextField
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
        </FormControl>
        <FormControl>
        <FormHelperText>To Date</FormHelperText>
        <div className='form-group'>
          <TextField
            variant='outlined'
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        </FormControl>
        <FormControl>
          <TextField
            name='description'
            variant='outlined'
            multiline
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </FormControl >
        <Button type='submit' ullWidth color="primary" variant="contained">
              Submit
        </Button>
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Container>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
