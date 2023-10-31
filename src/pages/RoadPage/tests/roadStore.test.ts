import { describe, it, expect, beforeEach } from 'vitest';

import { RoadStore } from '../store';
import { roadResponseFixture, blankStoreJSON } from './fixtures';

import type { CommonInfo } from '../../../features/DetailedView/types';

describe('RoadStore', () => {
  let store: RoadStore;

  beforeEach(() => {
    store = new RoadStore();
  });

  it('Fresh created store fields must be null', () => {
    expect(JSON.stringify(store)).toEqual(blankStoreJSON);
  });

  it('Update store values with no errors', () => {
    store.updateEntity(roadResponseFixture as CommonInfo);
    expect(store.id).toEqual(32197941);
    expect(store.hash).toEqual('ed5559dce6ebdf3d2aef9402081d1b31');
    expect(store.hasGeometry).toEqual(true);
    expect(store.isAuthor).toEqual(false);
    expect(store._visibleBlocks.length).toEqual(2);
    expect(store._fields.length).toEqual(37);
  });

  it('Field getter returns correct value', () => {
    store.updateEntity(roadResponseFixture as CommonInfo);
    expect(Object.keys(store.fields).length).toEqual(37);
    expect(store.fields.FULL_NAME.value).toEqual({ isChanged: false, value: '№ 0000622 Магазин - д № 26' });
  });

  it('Sections getter returns correct value', () => {
    store.updateEntity(roadResponseFixture as CommonInfo);
    const sections = store.sections;
    expect(sections.intersections.id).toEqual('intersections');
    expect(sections.intersections.blocks.length).toEqual(1);
  });

  it('Toggle section updates value correctly', () => {
    store.updateEntity(roadResponseFixture as CommonInfo);
    store.updateBlockFields('intersections', 0, { name: 'hello' });
    const sections = store.sections;
    expect(sections.intersections.blocks[0].name).toEqual('hello');
  });
});
