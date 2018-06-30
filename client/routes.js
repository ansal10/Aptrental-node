import React from 'react';
import App from './app';
import HomePage from './pages/homePage';
import ContactPage from './pages/contactPage';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import About from './pages/aboutPage';
import Posts from './pages/postsPage';
import Post from './pages/postPage';
import Property from './pages/propertyPage';
import Properties from './pages/propertiesPage';
import TermsAndConditions from './pages/policies/termsAndConditions';
import Privacy from './pages/policies/privacy';
import CookiesPolicy from './pages/policies/cookiesPolicy';
import NotFoundPage from './pages/notFound404Page';

export default [
    {
        path: '/blog',
        ...App,
        routes: [
            {
                path: '/blog/:id',
                ...Post
            },
            {
                ...Posts
            }
        ]
    },
    {
        path: '/property',
        ...App,
        routes: [
            {
                path: '/property/:id',
                ...Property
            }
        ]
    },
    {
        path: '/properties',
        ...App,
        routes: [
            {
                ...Properties
            }
        ]
    },
    {
        path: '/about',
        ...App,
        routes: [
            {
                ...About
            }
        ]
    },
    {
        path: '/contact',
        ...App,
        routes: [
            {
                ...ContactPage
            }
        ]
    },
    {
        path: '/register',
        ...App,
        routes: [
            {
                ...RegisterPage
            }
        ]
    },
    {
        path: '/login',
        ...App,
        routes: [
            {
                ...LoginPage
            }
        ]
    },
    {
        path: '/policies/terms',
        ...App,
        routes: [
            {
                ...TermsAndConditions
            }
        ]
    },
    {
        path: '/policies/privacy',
        ...App,
        routes: [
            {
                ...Privacy
            }
        ]
    },
    {
        path: '/policies/cookies',
        ...App,
        routes: [
            {
                ...CookiesPolicy
            }
        ]
    },
    {
        path: '/',
        exact: true,
        ...App,
        routes: [
            {
                ...Properties
            }
        ]
    },
    {
        path: '/',
        ...App,
        routes: [
            {
                ...NotFoundPage
            }
        ]
    }
];

