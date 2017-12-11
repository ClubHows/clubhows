import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '../../common/components/web';

const renderMetaData = () => (
  <Helmet
    title="Dashboard"
    meta={[
      {
        name: 'description',
        content: 'Dashboard page'
      }
    ]}
  />
);

const DashboardView = () => {
  return (
    <PageLayout>
      {renderMetaData()}
      <div className="text-center mt-4 mb-4">
        <p>Hello Dashboard!</p>
      </div>
    </PageLayout>
  );
};

export default DashboardView;
