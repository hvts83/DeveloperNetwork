import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


const Navbar =  (
  { auth: { isAuthenticated, loading }, logout }) => {
    const classes = useStyles();
  const authLinks = (
        <React.Fragment>
        <nav>
        <Link variant="button" color="textPrimary"  to='/profiles' className={classes.link}>Developers</Link>

        <Link variant="button" color="textPrimary"  to='/posts' className={classes.link}>Posts</Link>

        <Link variant="button" color="textPrimary" to='/dashboard' className={classes.link}>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>

        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
        </nav>
        </React.Fragment>
  );
  const guestLinks = (
    <React.Fragment>
        <nav>
        <Link variant="button" color="textPrimary" className={classes.link} to='/profiles'>Developers</Link>
        <Link variant="button" color="textPrimary" className={classes.link} to='/register'>Register</Link>
        <Link to='/login'>
          <Button  color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Link>
        </nav>
    </React.Fragment>
  );
  
 
  return (
    <React.Fragment>
    <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link to='/'>
              Flatiron Developer Network
            </Link>
          </Typography>
          <nav>
            {!loading && (
              <React.Fragment>{isAuthenticated ? authLinks : guestLinks}</React.Fragment>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
