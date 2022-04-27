import React from 'react';

import { storiesOf } from '@storybook/react';

import Button from '../../../src/components/base/Button';
import Check from '../../../src/components/base/SVG/Check';
import Eye from '../../../src/components/base/SVG/Eye';
import Typography from '../../../src/components/base/Typography';
import Container from '../../components/Container';

storiesOf('base/Button', module).add('Summary', () => (
  <Container background="white">
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ marginRight: '20px', marginBottom: '30px' }}>
        <Button text="Primary Button" style={{ marginBottom: '5px' }} />
        <Button
          text="Primary Button with Icon"
          icon={<Eye fill="white" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Primary Button with Icon"
          icon={<Eye fill="white" height={15} width={20} />}
          iconPosition="before"
          style={{ marginBottom: '5px' }}
        />
        <Button
          icon={<Eye fill="white" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Primary Button Loading"
          style={{ marginBottom: '5px' }}
          loading
        />
        <Button
          text=""
          style={{ marginBottom: '5px' }}
          loading
          noTextOnLoading
        />
      </div>
      <div style={{ marginRight: '20px', marginBottom: '30px' }}>
        <Button
          text="Outline Button"
          variant="outline"
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Outline Button with Icon"
          variant="outline"
          icon={<Eye fill="#E35D32" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Outline Button with Icon"
          variant="outline"
          icon={<Eye fill="#E35D32" height={15} width={20} />}
          iconPosition="before"
          style={{ marginBottom: '5px' }}
        />
        <Button
          variant="outline"
          icon={<Eye fill="#E35D32" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
        <Button
          loading
          text="Outline Button Loading"
          variant="outline"
          style={{ marginBottom: '5px' }}
        />
      </div>
      <div style={{ marginRight: '20px', marginBottom: '30px' }}>
        <Button
          text="Disabled Button"
          variant="disabled"
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Disabled Button with Icon"
          variant="disabled"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Disabled Button with Icon"
          variant="disabled"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          iconPosition="before"
          style={{ marginBottom: '5px' }}
        />
        <Button
          variant="disabled"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
      </div>
      <div style={{ marginRight: '20px' }}>
        <Button
          text="Success Button"
          style={{ marginBottom: '5px' }}
          variant="success"
          icon={<Check fill="#fff" />}
        />
      </div>

      <div style={{ marginRight: '20px' }}>
        <Button
          text="Unselected Button"
          variant="unselected"
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Unselected Button with Icon"
          variant="unselected"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Unselected Button with Icon"
          variant="unselected"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          iconPosition="before"
          style={{ marginBottom: '5px' }}
        />
        <Button
          variant="unselected"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
      </div>

      <div style={{ marginRight: '20px' }}>
        <Button
          text="Small Button"
          variant="unselected"
          size="sm"
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Small Button with Icon"
          variant="unselected"
          size="sm"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
        <Button
          text="Small Button with Icon"
          variant="unselected"
          size="sm"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          iconPosition="before"
          style={{ marginBottom: '5px' }}
        />
        <Button
          variant="unselected"
          size="sm"
          icon={<Eye fill="#BBC2DC" height={15} width={20} />}
          style={{ marginBottom: '5px' }}
        />
      </div>
    </div>
  </Container>
));
