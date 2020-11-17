/**
 * External dependencies
 */
import { ProgressBar } from '@automattic/components';
import { __ } from '@wordpress/i18n';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { QuestionLayout } from '../layout';
import { jetpackCreateInterpolateElement } from 'components/create-interpolate-element';
import ExternalLink from 'components/external-link';
import InstallButton from 'components/install-button';
import { imagePath } from 'constants/urls';
import { updateRecommendationsStep } from 'state/recommendations';

const RelatedPostsQuestionComponent = props => {
	useEffect( () => {
		props.updateRecommendationsStep( 'related-posts' );
	} );

	return (
		<QuestionLayout
			progressBar={ <ProgressBar color={ '#00A32A' } value={ '67' } /> }
			question={ __(
				'Would you like Related Posts to display at the bottom of your content?',
				'jetpack'
			) }
			description={ jetpackCreateInterpolateElement(
				__(
					'Displaying <strong>Related Posts</strong> at the end of your content keeps visitors engaged and on your site longer. <ExternalLink>Learn more</ExternalLink>',
					'jetpack'
				),
				{
					strong: <strong />,
					ExternalLink: (
						<ExternalLink
							href="https://jetpack.com/support/related-posts/"
							target="_blank"
							icon={ true }
							iconSize={ 16 }
						/>
					),
				}
			) }
			answer={
				<div className="jp-recommendations-question__install-section">
					<InstallButton primary>{ __( 'Enable Related Posts' ) }</InstallButton>
					<a href="">{ __( 'Decide later' ) }</a>
				</div>
			}
			illustration={
				<img
					className="jp-recommendations-question__illustration"
					src={ imagePath + '/recommendations/related-posts-illustration.svg' }
					alt=""
				/>
			}
		/>
	);
};

const RelatedPostsQuestion = connect(
	state => ( {} ),
	dispatch => ( {
		updateRecommendationsStep: step => dispatch( updateRecommendationsStep( step ) ),
	} )
)( RelatedPostsQuestionComponent );

export { RelatedPostsQuestion };