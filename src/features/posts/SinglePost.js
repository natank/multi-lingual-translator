import React from 'react';
import { Button, Card, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { postDeleted, reactionAdded, selectPostReactions } from './postsSlice';

const useStyles = makeStyles({
	root: {
		padding: '2rem 1rem',
	},
	buttons: {
		display: 'flex',
		gap: '1rem',
		justifyContent: 'space-between',
	},
	date: {
		fontWeight: 'normal',
		fontSize: '1rem',
	},
	interactButtons: {
		display: 'flex',
		gap: '1rem',
		justifyContent: 'flex-end',
	},
	title: {
		marginBottom: '2rem',
	},
	content: {
		marginBottom: '2rem',
	},
});

export function SinglePost({ post }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { title, body: content, date } = post;
	const reactions = useSelector(state => selectPostReactions(state, post.id));

	return (
		<Card className={classes.root}>
			<Typography variant='h6' gutterBottom={true} className={classes.title}>
				<span>{`${title},   `}</span>
				<i>
					<span className={classes.date}>{date}</span>
				</i>
			</Typography>
			<Typography gutterBottom={true} className={classes.content}>
				{content}
			</Typography>
			<Container
				classes={{
					root: classes.buttons,
				}}>
				<Container>
					<Button
						variant='contained'
						onClick={() => dispatch(postDeleted({ id: post.id }))}
						disabled>
						X
					</Button>
				</Container>
				<Container className={classes.interactButtons}>
					<Button
						variant='contained'
						onClick={() =>
							dispatch(reactionAdded({ id: post.id, reaction: 'likes' }))
						}>
						Like{reactions.likes ? `(${reactions.likes})` : null}
					</Button>
					<Button
						onClick={() =>
							dispatch(reactionAdded({ id: post.id, reaction: 'dislikes' }))
						}>
						Dislike{reactions.dislikes ? `(${reactions.dislikes})` : null}
					</Button>
				</Container>
			</Container>
		</Card>
	);
}
