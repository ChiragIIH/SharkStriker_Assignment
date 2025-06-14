import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import departmentReducer from './slices/departmentSlice';
import ticketReducer from './slices/ticketSlice';
import escalationRuleReducer from './slices/escalationRuleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    departments: departmentReducer,
    tickets: ticketReducer,
    escalationRules: escalationRuleReducer,
  },
}); 