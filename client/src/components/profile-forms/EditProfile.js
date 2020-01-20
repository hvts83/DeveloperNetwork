import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 400,
    },
  },
}));


const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  
  const classes = useStyles()
  return (
    <Fragment>
    <Container>
    <CssBaseline/>
   
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className={classes.root} onSubmit={e => onSubmit(e)}>
        <FormControl variant="outlined">
          <Select name='status' value={status} onChange={e => onChange(e)}>
            <MenuItem>* Select Professional Status</MenuItem>>
            <MenuItem value='Developer'>Developer</MenuItem>>
            <MenuItem value='Junior Developer'>Junior Developer</MenuItem>>
            <MenuItem value='Senior Developer'>Senior Developer</MenuItem>>
            <MenuItem value='Manager'>Manager</MenuItem>
            <MenuItem value='Student or Learning'>Student or Learning</MenuItem>>
            <MenuItem value='Instructor'>Instructor or Teacher</MenuItem>
            <MenuItem value='Intern'>Intern</MenuItem>>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
          <FormHelperText>Give us an idea of where you are at in your career</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            label='company'
            placeholder='Company'
            name='company'
            value={company}
            variant="outlined"
            onChange={e => onChange(e)}
          />
          <FormHelperText>Could be your own company or one you work for</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            label='Website'
            placeholder='Website'
            name='website'
            variant="outlined"
            value={website}
            onChange={e => onChange(e)}
          />
          <FormHelperText> Could be your own or a company website</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            variant='outlined'
            label='Location'
            onChange={e => onChange(e)}
          />
          <FormHelperText>City & state suggested (eg. Boston, MA)</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            variant='outlined'
            label='Skills'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
        <FormHelperText>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            type='text'
            label='Github Username'
            placeholder='Github Username'
            name='githubusername'
            variant='outlined'
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <FormHelperText>If you want your latest repos and a Github link, include your
            username</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            multiline
            variant='outlined'
            label='Bio'
            rows='5'
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
          <FormHelperText>Tell us a little about yourself</FormHelperText>
        </FormControl>

      
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
