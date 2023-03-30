import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { fileItems } from '../../../stories-data';
import { FileDownloadBlock as FileDownloadBlockComponent } from './file-download-block';

export default {
  title: 'Blocks/File Download Block',
  component: FileDownloadBlockComponent,
} as ComponentMeta<typeof FileDownloadBlockComponent>;

const FileDownloadBlock: ComponentStory<typeof FileDownloadBlockComponent> = (props) => {
  return (
    <Router>
      <FileDownloadBlockComponent {...props} />
    </Router>
  );
};

FileDownloadBlock.args = {
  items: fileItems,
};

export { FileDownloadBlock };
