import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 40, style }) => (
  <div
    className={styles.skeleton}
    style={{ width, height, borderRadius: 8, ...style }}
    aria-busy="true"
    aria-label="Loading..."
  />
);

export default Skeleton;
