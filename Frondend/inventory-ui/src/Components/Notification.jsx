import {notification} from 'antd'
import { useEffect } from 'react'

const Notification = () => {

      const [ api , contextHolder ] = notification.useNotification()

      useEffect(() => {
            
            api.open({
                  message : 'test' ,
                  description : 'Good think'
            })
           
      }, []);
      

      return <>
            {contextHolder}   
      </>
}

export default Notification