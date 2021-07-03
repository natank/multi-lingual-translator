import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { LanguageSelector } from './features/language';
import { Paging } from './features/paging';
import { PostsList } from './features/posts';
import { MainContainer } from './app/MainContainer';
import { Nav } from './app/Nav';

const useStyles = makeStyles({
	posts: {
		height: '60vh',
		position: 'relative',
		overflow: 'scroll',
	},
	paging1: {
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
		width: '100%',
		bottom: '1rem',
	},
});

function App() {
	const classes = useStyles();
	return (
		<MainContainer>
			<Grid item xs={12}>
				<LanguageSelector />
			</Grid>
			<Grid container item xs={12}>
				<Grid item xs={3}>
					<Nav />
				</Grid>
				<Grid item xs={9}>
					<div className={classes.posts}>
						<PostsList />
					</div>
					<Paging />
				</Grid>
			</Grid>
		</MainContainer>
	);
}

export default App;
