import { ModuleContainer } from 'inversiland';
import React, { createContext } from 'react';
import { PropsWithChildren } from "react";
import { useContextStore } from "src/core/presentation/hooks/useContextStore";

/**
 * Função genérica para criar um contexto, provider e hook para um store.
 * @param container - O contêiner de injeção de dependências.
 * @param storeName - O nome do store a ser obtido do contêiner.
 * @returns Um objeto contendo o StoreProvider e o hook useStore.
 */
export function createStore<T>(container: ModuleContainer, storeName: string) {
	const StoreContext = createContext<T | null>(null);

	StoreContext.displayName = storeName;

	/**
	 * Componente Provider para fornecer o store ao contexto.
	 * @param children - Os componentes filhos que terão acesso ao store.
	 * @returns O Provider do contexto com o store obtido do contêiner.
	 */
	const StoreProvider = ({ children }: PropsWithChildren) => {
		return (<StoreContext.Provider value={container.get(storeName)}>
			{children}
		</StoreContext.Provider>);
	};

	/**
	 * Hook para acessar o store do contexto.
	 * @returns O store do contexto.
	 * @throws Erro se o hook for usado fora do StoreProvider.
	 */
	const useStore = (): T => {
		const store = useContextStore(StoreContext);
		if (store === undefined) {
			throw new Error('useStore must be used within a StoreProvider');
		}
		return store;
	};

	return { StoreProvider, useStore };
}