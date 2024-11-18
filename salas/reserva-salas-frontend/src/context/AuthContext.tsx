import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  signIn: (userName: string) => void;
  signOut: () => void;
  errorMessage: string | null;
  userName: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
  errorMessage: null,
  userName: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const signIn = (nome: string) => {
    if (nome) {
      setIsSignedIn(true);
      setUserName(nome); 
      setErrorMessage(null); 
      console.log('Usuário autenticado:', nome);
    } else {
      setErrorMessage('Credenciais inválidas');
      console.log('Credenciais inválidas');
    }
  };
  

  const signOut = () => {
    setIsSignedIn(false);
    setUserName(null);
    console.log('Usuário deslogado');
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut, errorMessage, userName }}>
      {children}
    </AuthContext.Provider>
  );
};
