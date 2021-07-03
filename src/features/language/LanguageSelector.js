import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCurrentLanguage,
	selectLanguageList,
	languageSelected,
} from './languageSlice';

const useStyles = makeStyles(theme => ({
	root: {
		minWidth: 120,
	},
}));

export function LanguageSelector() {
	const classes = useStyles();
	const currentLanguage = useSelector(selectCurrentLanguage);
	const languageList = useSelector(selectLanguageList);
	const dispatch = useDispatch();
	useEffect(() => {});
	return (
		<FormControl variant='filled' className={classes.root}>
			<InputLabel id='lang-select-label'>Language</InputLabel>
			<Select
				labelId='lang-select-label'
				id='lang-select'
				value={currentLanguage ? currentLanguage.id : ''}
				onChange={event => {
					dispatch(languageSelected(event.target.value));
				}}>
				<MenuItem value={-1}>
					<em>None</em>
				</MenuItem>
				{languageList.map(language => (
					<MenuItem value={language.id} key={language.id}>
						{language.title}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
