import {
      PieChartOutlined,
      DeliveredProcedureOutlined ,
      ShoppingCartOutlined    } from '@ant-design/icons';

import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
}

const items = [

  getItem('Shopy IMS' , '0'),
  getItem('Inventory', '1', <PieChartOutlined /> ),
  getItem('Supplier', '2', <DeliveredProcedureOutlined />),
  getItem('Product', '3', <ShoppingCartOutlined />),
  
];

const Navigation = () => {
   
    const clickEventChangeURL = ({key}) => {

        switch(key) {
            case '1' :
              return window.location.assign('https://shopy-ims-client.vercel.app/')

            case '2' :
              return window.location.assign('https://shopy-ims-client.vercel.app/supplier')

            case '3' :
              return window.location.assign('https://shopy-ims-client.vercel.app/product')

        }
    }

    const getDefaultSelectedKeys = () => {
        
        const path = window.location.pathname.split('/')[1]

        switch(path) {

            case  'supplier' : return '2'
            case 'product' : return '3'
            default : return '1'

        }
    }

    return (
      <div
        style={{
          width: 250,
        }}
      >
        
        <Menu
          onClick={clickEventChangeURL}
          style={{height:725 , padding : 20 , marginTop : 10 , borderRadius : 10}}
          mode= "inline"
          theme="dark"
          items={items}
          defaultSelectedKeys = {getDefaultSelectedKeys()}
        />
      </div>
    );
};
export default Navigation;
