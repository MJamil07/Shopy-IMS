

import { 
    BrowserRouter  ,
    Routes ,
    Route
  } from  'react-router-dom'
import Inventory from './Components/Inventory';
import Supplier from './Components/Supplier';
import Product from './Components/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inventory/>} />
          <Route path='/supplier' element={<Supplier/>} />
          <Route path='/product' element={<Product/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
