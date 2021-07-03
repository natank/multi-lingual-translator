import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import { SinglePost } from './SinglePost';

import { selectAllPosts, fetchPosts } from './postsSlice';
import { selectCurrPage } from '../paging/';
import {
	selectCurrentLanguage,
	selectTranslatedPosts,
	translatePosts,
} from '../language';

const POSTS_PER_PAGE = 5;

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		overflowY: 'scroll',
		maxWidth: 760,
		backgroundColor: theme.palette.background.paper,
	},
	loader: {
		textAlign: 'center',
		height: '50vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	error: {
		textAlign: 'center',
	},
}));

export function PostsList() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(state => state.posts.status);
	const postsError = useSelector(state => state.posts.error);
	const translationStatus = useSelector(state => state.language.status);
	const translationError = useSelector(state => state.language.error);
	const translatedPosts = useSelector(selectTranslatedPosts);
	const currPage = useSelector(selectCurrPage);
	const currentLanguage = useSelector(selectCurrentLanguage);
	const postsBeforeTranslation = posts.slice(
		currPage * POSTS_PER_PAGE,
		(currPage + 1) * POSTS_PER_PAGE
	);

	const [displayedPosts, setDisplayedPosts] = useState([translatedPosts]);

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

	useEffect(() => {
		if (currentLanguage && currentLanguage !== -1) {
			dispatch(
				translatePosts({
					posts: postsBeforeTranslation,
					language: currentLanguage,
				})
			);
		} else {
			setDisplayedPosts(postsBeforeTranslation);
		}
	}, [currentLanguage, currPage, dispatch, posts]);

	useEffect(() => {
		if (translatedPosts) {
			setDisplayedPosts(translatedPosts);
		} else {
			setDisplayedPosts(postsBeforeTranslation);
		}
	}, [translatedPosts]);
	let content;

	if (postsStatus === 'loading') {
		content = <Typography className={classes.loader}>Loading...</Typography>;
	} else if (postsStatus === 'succeeded') {
		content = (
			<div className={classes.root}>
				<List component='ul'>
					{displayedPosts.map((post, index) => (
						<ListItem key={post.id} id={index}>
							<SinglePost post={post} />
						</ListItem>
					))}
				</List>
			</div>
		);
	} else {
		content = <Typography className={classes.error}>{postsError}</Typography>;
	}

	return content;
}
