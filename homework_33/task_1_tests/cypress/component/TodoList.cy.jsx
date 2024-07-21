import React from 'react'
import { mount } from 'cypress/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import TodoList from '../../src/components/TodoList'
import todoReducer from '../../src/redux/todoSlice'
import rootSaga from '../../src/redux/todoSaga'

describe('TodoList Component', () => {
    const sagaMiddleware = createSagaMiddleware()

    const createTestStore = (initialState) => {
        const store = configureStore({
            reducer: {
                todos: todoReducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(sagaMiddleware),
            preloadedState: initialState,
        })
        sagaMiddleware.run(rootSaga)
        return store
    }

    const mountComponent = (initialState = { todos: { items: [], error: null } }) => {
        const store = createTestStore(initialState)
        return mount(
            <Provider store={store}>
                <TodoList />
            </Provider>
        )
    }

    it('should have a title "TODO"', () => {
        mountComponent()
        cy.get('h1').should('have.text', 'TODO')
    })

    it('should allow entering both numbers and letters in the input field', () => {
        mountComponent()
        cy.get('input[type="text"]').type('Test123').should('have.value', 'Test123')
    })

    it('should show an error when trying to add an empty todo', () => {
        mountComponent()
        cy.get('form').submit()
        cy.get('p').should('have.text', 'Todo text cannot be empty')
    })

    it('should add a new todo item when submitting with text', () => {
        mountComponent()
        cy.get('input[type="text"]').type('New Todo')
        cy.get('form').submit()
        cy.get('li').should('have.length', 1).and('contain', 'New Todo')
    })

    it('should clear the input field after adding a todo', () => {
        mountComponent()
        cy.get('input[type="text"]').type('New Todo')
        cy.get('form').submit()
        cy.get('input[type="text"]').should('have.value', '')
    })
})
