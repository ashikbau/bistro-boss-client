
// import { useState } from 'react';
// import OrderCoverImg from '../../../assets/shop/banner2.jpg'
// import Cover from '../../Shared/Cover/Cover';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import useMenu from '../../../hooks/useMenu';

// import OrderTab from '../OrderTab/OrderTab';
// import { useParams } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';



// const Order = () => {
//   const categories = ['salad','pizza','dessert','soup','drinks'];
//    const {category} = useParams();
//    const initialIndex = categories.indexOf(category);

//   const [tabIndex, setTabIndex] = useState(initialIndex);
//   const [menu] = useMenu();
 
//   // console.log(category)
//   const desserts = menu.filter(item => item.category === "dessert")
//   const soup = menu.filter(item => item.category === "soup")
//   const salad = menu.filter(item => item.category === "salad")
//   const pizza = menu.filter(item => item.category === "pizza")
//   const drinks = menu.filter(item => item.category === "drinks")
//   return (
//     <div>
//       <Helmet>
//     <title>Bistro Boss |Order Food</title>
                      
//     </Helmet>
//       <Cover img={OrderCoverImg} title="Order Food"></Cover>
//       <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
//         <TabList>
//           <Tab>Salad</Tab>
//           <Tab>Pizza</Tab>
//           <Tab>Soup</Tab>
//           <Tab>Desserts</Tab>
//           <Tab>Drinks</Tab>
//         </TabList>
//         <TabPanel>
//           <OrderTab items={salad}></OrderTab>
//         </TabPanel>
//         <TabPanel>
//           <OrderTab items={pizza}></OrderTab>
//         </TabPanel>
//         <TabPanel>
//           <OrderTab items={desserts}></OrderTab>
//         </TabPanel>
//         <TabPanel>
//           <OrderTab items={soup}></OrderTab>
//         </TabPanel>
//         <TabPanel>
//           <OrderTab items={drinks}></OrderTab>
//         </TabPanel>
//       </Tabs>
//     </div>
//   );
// };

// export default Order;

// new code from here

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import OrderCoverImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../Shared/Cover/Cover';
import OrderTab from '../OrderTab/OrderTab';

const Order = () => {
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex === -1 ? 0 : initialIndex);

  return (
    <div className='mt-8'>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
      <Cover img={OrderCoverImg} title="Order Food" />

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>

        <TabPanel>
          <OrderTab category="salad" />
        </TabPanel>
        <TabPanel>
          <OrderTab category="pizza" />
        </TabPanel>
        <TabPanel>
          <OrderTab category="soup" />
        </TabPanel>
        <TabPanel>
          <OrderTab category="dessert" />
        </TabPanel>
        <TabPanel>
          <OrderTab category="drinks" />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
