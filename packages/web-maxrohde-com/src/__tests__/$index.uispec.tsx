import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '../routes/$index';

describe('Render tests', () => {
  it('Should render component', () => {
    render(<Index posts={[]} pinnedPosts={[]} firstPage={true}></Index>);

    expect(screen.getByText('Latest Posts', { exact: false })).toBeVisible();
  });
});
