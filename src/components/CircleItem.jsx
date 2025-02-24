import React from 'react';
import styles from '../styles/CircleItem.module.scss';

const CircleItem = ({ item, isSelected, onClick }) => {
  return (
    <div className={`${styles.item} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      <img src={item.image} alt={item.name} className={styles.image} />
    </div>
  );
};

export default CircleItem;