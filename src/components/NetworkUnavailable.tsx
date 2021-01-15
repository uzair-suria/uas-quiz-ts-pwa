import { Button, Card, Link, Typography } from '@material-ui/core';
import React from 'react';

const NetworkUnavailable = () => {
	return (
		<div>
			<Card style={{ padding: 25 }}>
				<Typography variant="h5" align="center" color="secondary">
					Oops! That's embarrassing
				</Typography>
				<Typography variant="body1" align="justify">
					It looks like you are no longer connected to the internet. To access
					quiz questions, please try to re-establish your internet connection
					and then refresh the page
				</Typography>
				<Typography variant="body1" color="textSecondary" align="justify">
					If you think there is nothing wrong with the internet connection,
					please file an issue at{' '}
					<Link
						href="https://github.com/uzair-suria/uas-quiz-ts-pwa/issues"
						target="_blank"
					>
						project's GitHub repository
					</Link>
				</Typography>
			</Card>
			<div style={{ textAlign: 'center', marginTop: 10 }}>
				<Button href="/" variant="contained" color="secondary">
					Refresh
				</Button>
			</div>
		</div>
	);
};

export default NetworkUnavailable;
