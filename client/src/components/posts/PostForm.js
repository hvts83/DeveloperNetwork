import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <Container>
    <CssBaseline/>
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
    </Container>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
