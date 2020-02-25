import Grid, { GridProps } from '@material-ui/core/Grid';
import React from 'react';
import { Except } from 'type-fest';

interface Fields extends Except<GridProps, 'container' | 'item'> {}

function Fields({ children, xs, sm, md, lg, xl, spacing, ...other }: Fields) {
  return (
    <Grid container spacing={2} {...other}>
      {React.Children.map(
        children,
        child =>
          React.isValidElement<any>(child) &&
          (child.props.hidden || child.props.type === 'hidden' ? (
            child
          ) : (
            <Grid
              item
              xs={child.props.xs || xs || 12}
              sm={child.props.sm || sm}
              md={child.props.md || md}
              lg={child.props.lg || lg}
              xl={child.props.xl || xl}
            >
              {React.cloneElement(child)}
            </Grid>
          ))
      )}
    </Grid>
  );
}

export default Fields;
