import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Signup from "./Components/Signup/Signup"
import RootLayout from './Components/RootLayout/RootLayout';
import Home from "./Components/home/Home";
import Signin from './Components/signin/Signin';
import ErrorPage from "./Components/Errorpage"
import UserProfile from "./Components/user-profile/UserProfile"
import AuthorProfile from "./Components/author-profile/AuthorProfile"
import Article from "./Components/Article/Article"
import Articles from "./Components/Articles/Articles"
import ArticlesByAuthor from "./Components/ArticlesByAuthor/ArticlesByAuthor"
import {lazy, Suspense} from 'react'
//const Articles=lazy(()=>import('./components/articles/Articles'))
const AddArticle=lazy(()=>import("./Components/add-article/AddArticle"))

function App() {
  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/home',
        element:<Home />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:"/signin",
        element:<Signin />,
      },
      {
        path:"/user-profile",
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:"",
            element:<Navigate to='articles' />
          }
        ]
      },
      {
        path:"/author-profile",
        element:<AuthorProfile />,
        children:[
          {
            path:'new-article',
            element:<Suspense fallback="loading..."><AddArticle /></Suspense> 
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor />,
           
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles-by-author/:author' />
          }
        ]
      }
    ]
  }])

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;