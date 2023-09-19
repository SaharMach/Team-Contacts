const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'
import { store } from './store/store.js'
import { ContactIndex } from './pages/ContactIndex.jsx'
// import { TodoEdit } from './pages/TodoEdit.jsx'
// import { UserProfile } from './pages/UserProfile.jsx'

export function App() {
    //asdasdasd
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <AppHeader />
                    
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<ContactIndex />} />
                            {/* <Route path="/about" element={<AboutUs />} />
                            <Route path="/admin" element={<Admin />}/>
                            <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
                            <Route path="user/profile" element={<UserProfile />}/> */}
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </div>
            </Router>
        </Provider>
    )
}
