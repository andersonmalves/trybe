import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { shareIcon } from '../../images';

import { StyledImage, StyledAlert, StyledButton } from './styles';

export default function ShareButton(props) {
  const [propsState] = useState(props);
  const { recipeId, type } = propsState;
  const [show, setShow] = useState(false);

  const handleClick = () => {
    copy(`${window.location.origin}/${type}/${recipeId}`);
    setShow(true);
  };

  return (
    <>
      <StyledAlert show={ show } variant="success">
        <StyledAlert.Heading>Link copiado!</StyledAlert.Heading>
        <div className="d-flex justify-content-end">
          <StyledButton onClick={ () => setShow(false) } variant="outline-success">
            Ok!
          </StyledButton>
        </div>
      </StyledAlert>
      {!show
        && <StyledImage
          src={ shareIcon }
          onClick={ handleClick }
          alt="Share"
          data-testid="share-btn"
        />}
    </>

  );
}
