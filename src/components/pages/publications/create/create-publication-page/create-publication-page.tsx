import { FC } from 'react';

import Page from '@/components/common/page/page';
import FormPageHeader from '@/components/pages/components/form-page-header/form-pageheader';
import PublicationForm from '@/components/pages/components/publication-form/publication-form';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';

import { PAGE_TITLE } from './constants';

const CreatePublicationPage: FC = () => {
  async function handleSubmit(values: CreatePublicationData) {
    console.log(values);
  }

  return (
    <Page title={PAGE_TITLE}>
      <FormPageHeader />

      <PublicationForm type="create" header="Qual pet você está anunciando?" onSubmit={handleSubmit} />
    </Page>
  );
};

export default CreatePublicationPage;
