import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '../routes/$index';
import { startLocalDynamoDB, stopLocalDynamoDB } from 'db-blog';

jest.setTimeout(120000);

describe('Render tests', () => {
  beforeAll(async () => {
    await startLocalDynamoDB();
  });
  it('Should render component', () => {
    render(<Index posts={[]} pinnedPosts={[]} firstPage={true}></Index>);

    expect(screen.getByText('Latest Posts', { exact: false })).toBeVisible();
  });
  afterAll(async () => {
    await stopLocalDynamoDB();
  });
});
