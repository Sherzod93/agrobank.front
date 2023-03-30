import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { preparePersonData } from '../../../interfaces/classes/helpers';
import { staffExperience } from '../../../stories-data';
import { StaffExperienceBlock as StaffExperienceBlockComponent } from './staff-experience-block';

export default {
  title: 'Blocks/Staff Experience Block',
  component: StaffExperienceBlockComponent,
} as ComponentMeta<typeof StaffExperienceBlockComponent>;

const StaffExperienceBlock: ComponentStory<typeof StaffExperienceBlockComponent> = (props) => {
  return (
    <Router>
      <StaffExperienceBlockComponent
        {...props}
        items={props.items.map((item) => ({
          ...item,
          person: preparePersonData(item.person),
        }))}
      />
    </Router>
  );
};

StaffExperienceBlock.args = {
  items: staffExperience,
};

export { StaffExperienceBlock };
