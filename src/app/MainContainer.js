import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		width: '70%',
		margin: 'auto',
	},
});

export function MainContainer(props) {
	const classes = useStyles();
	return (
		<Grid container className={classes.root} spacing={2}>
			{props.children}
		</Grid>
	);
}
