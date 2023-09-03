import React, { useState } from 'react';

import StyledCard from './styles';

export default function RecomendationCard(props) {
  const [propsState] = useState(props);
  const { recipe, index } = propsState;
  if (recipe) {
    return (
      <StyledCard>
        <StyledCard.Img variant="top" src={ recipe.image } />
        <StyledCard.Body>
          <StyledCard.Text>{recipe.category}</StyledCard.Text>
          <StyledCard.Title
            data-testid={ `${index}-recomendation-title` }
          >
            {recipe.name}
          </StyledCard.Title>
        </StyledCard.Body>
      </StyledCard>
    );
  }
  return (<div />);
}