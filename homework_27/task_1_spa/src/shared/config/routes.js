import Home from '../../pages/ui/Home';
import Contacts from "../../pages/ui/Contacts.jsx";
import AboutMe from "../../pages/ui/AboutMe.jsx";

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home,
        exact: true,
    },
    {
        name: 'Contacts',
        path: '/contacts',
        component: Contacts,
    },
    {
        name: 'About me',
        path: '/about-me',
        component: AboutMe,
    }
];

export default routes;