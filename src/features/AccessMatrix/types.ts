import { defaultAccessMatrix } from './defaultAccessMatrix';

export type AccessMatrixKey = keyof typeof defaultAccessMatrix;

export type AccessMatrix = Record<AccessMatrixKey, boolean>;
