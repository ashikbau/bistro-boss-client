import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import OrderCoverImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../Shared/Cover/Cover';
import OrderTab from '../OrderTab/OrderTab';

const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];

const Order = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex === -1 ? 0 : initialIndex);

  // 🔁 Sync tabIndex if route param changes
  useEffect(() => {
    if (initialIndex !== -1 && initialIndex !== tabIndex) {
      setTabIndex(initialIndex);
    }
  }, [category]);

  // 🔁 Change URL when tab changes
  const handleTabSelect = (index) => {
    setTabIndex(index);
    navigate(`/order/${categories[index]}`);
  };

  return (
    <div className='mt-8'>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>

      <Cover img={OrderCoverImg} title="Order Food" />

      <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
        <TabList >
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
