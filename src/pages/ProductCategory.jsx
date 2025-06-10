import React from 'react'
import { useAppContext } from '../context/AppContect';
import { useParams } from 'react-router-dom';

const ProductCategory = () => {
    const {products} = useAppContext();
const {category} = useParams()


  return (
    <div>
      
    </div>
  )
}

export default ProductCategory;
