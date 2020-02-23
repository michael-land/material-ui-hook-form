import Grid, { GridProps } from '@material-ui/core/Grid';
import React from 'react';
import { Except } from 'type-fest';

interface Fields extends Except<GridProps, 'container' | 'item'> {}

function Fields({ children, xs, sm, md, lg, xl, ...other }: Fields) {
  return (
    <div>
      <Grid container {...other}>
        {React.Children.map(
          children,
          child =>
            React.isValidElement<any>(child) && (
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
            )
        )}
      </Grid>
    </div>
  );
}

export default Fields;
