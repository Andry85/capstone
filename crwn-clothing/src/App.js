import {Routes, Route} from 'react-router-dom';

import Home from './routs/home/home.component';
import Navigation from './routs/navigation/navigation.component';
import Authentication from './routs/authentication/authentication.component';



const Shop = () => {
  return <h1>I am a shop page</h1>;
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />}/>
        <Route path="auth" element={<Authentication />}/>
      </Route>
    </Routes>
  );
}

export default App;
