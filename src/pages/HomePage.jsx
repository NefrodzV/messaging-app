import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../stylesheets/HomePage.module.css';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import hamburgerSvg from '../assets/svgs/hamburger.svg';
import { NavLink } from 'react-router-dom';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';

export default function HomePage() {
    return (
        <div className={style.page}>
            <header className={style.header}>
                <div>Chatia</div>
                <Navigation />
            </header>
            <main className={style.main}>
                <ChatList />
                <Chat />
            </main>
        </div>
    );
}
