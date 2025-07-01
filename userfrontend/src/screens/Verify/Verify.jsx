import { useContext, useEffect } from 'react';
import './Verify.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.message === 'Not paid') {
        navigate('/');
      } else {
        navigate('/myorders');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      navigate('/');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <Loader />;
};

export default Verify;
