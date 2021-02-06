import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { StyledButton } from './styles';

function RecipeButton(props) {
  const [propsState, setPropsState] = useState(props);
  const { title, path } = propsState;
  const history = useHistory();

  const handleClick = (value) => {
    history.push(`${path}${value}`);
  };

  useEffect(() => setPropsState(props), [props]);

  return (

    <StyledButton
      data-testid="start-recipe-btn"
      type="button"
      onClick={ () => handleClick('/in-progress') }
    >
      {title}
    </StyledButton>

  );
}

/* <StyledNavBar
fixed="bottom"
data-testid="footer"
className="justify-content-center"
>
</StyledNavBar> */

export default RecipeButton;
