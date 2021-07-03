import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts } from '../posts/postsSlice';
import { selectCurrPage, pageSelected } from '../paging/pagesSlice';

const POSTS_PER_PAGE = 5;

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		'& > *': {
			marginTop: theme.spacing(2),
		},
	},
	list: { justifyContent: 'center' },
}));

export function Paging() {
	const dispatch = useDispatch();
	const posts = useSelector(selectAllPosts);
	const currPage = useSelector(selectCurrPage);

	const classes = useStyles();

	const handleChange = (event, value) => {
		dispatch(pageSelected({ value }));
	};

	return (
		<div className={classes.root}>
			<Pagination
				count={Math.ceil(posts.length / POSTS_PER_PAGE)}
				classes={{
					ul: classes.list,
				}}
				page={currPage}
				onChange={handleChange}
			/>
		</div>
	);
}
