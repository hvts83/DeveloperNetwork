import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles(theme => ({
	root: {
	  '& > *': {
		margin: theme.spacing(1),
		width: 400,
	  },
	},
}));

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const classes = useStyles();

  return (
    <Fragment>
    <Container>
    <CssBaseline/>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming positions
        that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className={classes.root}
        onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <FormControl>
          <TextField
            type='text'
            variant='outlined'
            label='Job Title'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            variant='outlined'
            label='Company'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            placeholder='Location'
            label='Location'
            variant='outlined'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </FormControl>
        <Grid container spacing={2}>
        <FormControl>
        <FormHelperText>From Date</FormHelperText>
          <TextField
            type='date'
            variant='outlined'
            name='from'
            variant='outlined'
            value={from}
            onChange={e => onChange(e)}
          />
        
        </FormControl>
        
        <FormControl>
        <FormHelperText>To Date</FormHelperText>
          <TextField
            type='date'
            name='to'
            variant='outlined'
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
          
        </FormControl>
        <FormControl>
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
            <FormHelperText>Current Job</FormHelperText>
        </FormControl>
        </Grid>
        <FormControl>
          <TextField
            name='description'
            multiline
            variant='outlined'
            label='Job Description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </FormControl>
        <Button type='submit' fullWidth color="primary" variant="contained">
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { addExperience }
)(withRouter(AddExperience));
