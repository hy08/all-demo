import React from 'react';
import HistoryContext from './HistoryContext';

export function useHistory() {
  return React.useContext(HistoryContext);
}
