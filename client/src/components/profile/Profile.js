import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  const classes = useStyles();
  return (
    <Fragment>
      <Container maxWidth="md">
        <CssBaseline />
        <Grid container spacing={2}>
          {profile === null || loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <Grid item xs={3}>
                <Link to="/profiles" className="btn btn-light">
                  Back To Profiles
                </Link>

                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link to="/edit-profile" className="btn btn-dark">
                      Edit Profile
                    </Link>
                  )}
                
                <ProfileTop profile={profile} />
                
                </Grid>
                <Grid item xs={3}>
                <ProfileAbout profile={profile} />
                </Grid>
                <Grid item xs={6}>
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map(experience => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No experience credentials</h4>
                )}
                <div className="profile-edu bg-white p-2">
                  <h2 className="text-primary">Education</h2>
                  {profile.education.length > 0 ? (
                    <Fragment>
                      {profile.education.map(education => (
                        <ProfileEducation
                          key={education._id}
                          education={education}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No education credentials</h4>
                  )}
                </div>
              </Grid>
              <Grid item xs={6}>
              
              {profile.githubusername && (
                <ProfileGithub username={profile.githubusername} />
              )}
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
