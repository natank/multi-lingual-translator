import React from 'react';
import { Button, Container } from '@material-ui/core';
export function Nav() {
	return (
		<Container>
			<Button>
				<a href='#0'>Post 1</a>
			</Button>
			<Button>
				<a href='#1'>Post 2</a>
			</Button>
			<Button>
				<a href='#2'>Post 3</a>
			</Button>
			<Button>
				<a href='#3'>Post 4</a>
			</Button>
			<Button>
				<a href='#4'>Post 5</a>
			</Button>
		</Container>
	);
}
