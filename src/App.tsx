import styles from './App.module.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Detail from './components/Detail';
import './App.css';
import getData from './api/getData';
import { Skeleton } from '@mui/material';

function App() {

  const getAllData = async () => {
    const apis = ['people', 'vehicles', 'planets', 'films', 'species', 'starships'];
    const data: any = [];
    for (let i = 0; i < apis.length; i++) {
      const currentData = await getData(apis[i]);
      data.push(...currentData);
    }
    return data;
  }

  const loader = async () => {
      return { loading: true };
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader,
    },
    {
      path: "/:type",
      element: <Root />,
      action: async ({ params }) => {
        if (params.type) {
          const data = await getData(params.type);
          return data;
        }
      },
      loader,
    },
    {
      path: "/all",
      element: <Root />,
      action: async () => {
        const data = await getAllData();
        return data;
      },
      loader,
    },
    {
      path: "/detail/:type/:id",
      element: <Detail />,
      action: async ({ params }) => {
        const data = await getData(`${params.type}/${params.id}`, true);
        return data;
      },
      loader,
    }
  ]);

  return (
    <div className={styles.App}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
