import React, { createContext, useContext } from 'react';

type AuthActions = {
  logout: () => void;
};

const AuthActionsContext = createContext<AuthActions | null>(null);

type Props = {
  value: AuthActions;
  children: React.ReactNode;
};

export const AuthActionsProvider = ({ value, children }: Props) => (
  <AuthActionsContext.Provider value={value}>
    {children}
  </AuthActionsContext.Provider>
);

export const useAuthActions = () => {
  const context = useContext(AuthActionsContext);
  if (!context) {
    throw new Error('useAuthActions must be used within AuthActionsProvider');
  }
  return context;
};
