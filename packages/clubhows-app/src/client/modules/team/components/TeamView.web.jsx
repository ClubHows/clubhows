import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '../../common/components/web';

const TeamView = () => {
  const renderMetaData = () => (
    <Helmet
      title="Team"
      meta={[
        {
          name: 'description',
          content: 'Team page'
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <div className="text-center mt-4 mb-4">
        <p>Hello Team!</p>
      </div>
    </PageLayout>
  );
};

export default TeamView;
